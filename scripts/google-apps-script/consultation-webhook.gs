const SHEET_NAME = "Submissions";

const SUBMISSION_TYPE_LABELS = {
  consultation: "Free Consultation",
  eventStyling: "Event Styling Service",
  balloonInstallation: "Balloon Installation Service",
  grabAndGo: "Grab 'n Go Service",
  offer: "Special Offer",
};

const LABEL_TO_SUBMISSION_TYPE = {
  "free consultation": "consultation",
  consultation: "consultation",
  "event styling package": "eventStyling",
  "event styling": "eventStyling",
  "balloon installation package": "balloonInstallation",
  "balloon installation": "balloonInstallation",
  "balloon installation service": "balloonInstallation",
  "balloon styling": "balloonInstallation",
  "balloon styling service": "balloonInstallation",
  "grab 'n go package": "grabAndGo",
  "grab and go package": "grabAndGo",
  "grab and go": "grabAndGo",
  "special offer": "offer",
  offer: "offer",
};

const CANONICAL_HEADERS = [
  "Submitted At",
  "Type",
  "Submission Type",
  "Name",
  "Email",
  "Phone Number",
  "Event Type",
  "Event Date",
  "Event Start Time",
  "Event End Time",
  "Venue Address",
  "Venue Type",
  "Event Theme",
  "Package",
  "Cost",
  "Discount",
  "Discount Percent",
  "Effective Cost",
  "Delivery",
  "Pickup Date",
  "Pickup Time",
  "Delivery Date",
  "Delivery Time",
  "Where did you hear about us",
  "Referral Code",
  "JOVIRA Gift Card or Voucher",
  "Additional Information",
  "Entry Source",
];

const REQUIRED_FIELDS_BY_TYPE = {
  consultation: ["name", "email", "phoneNumber"],
  eventStyling: [
    "name",
    "email",
    "phoneNumber",
    "eventType",
    "eventDate",
    "eventStartTime",
    "eventEndTime",
    "venueAddress",
    "venueType",
    "eventTheme",
    "package",
  ],
  balloonInstallation: [
    "name",
    "email",
    "phoneNumber",
    "eventType",
    "eventDate",
    "eventStartTime",
    "eventEndTime",
    "venueAddress",
    "venueType",
    "eventTheme",
    "package",
  ],
  grabAndGo: [
    "name",
    "email",
    "phoneNumber",
    "eventType",
    "eventTheme",
    "package",
    "delivery",
  ],
  offer: [
    "name",
    "email",
    "phoneNumber",
    "eventType",
    "eventDate",
    "eventStartTime",
    "eventEndTime",
    "venueAddress",
    "venueType",
    "eventTheme",
    "package",
  ],
};

function doGet() {
  return jsonResponse_({
    ok: true,
    message: "Jovira consultation webhook is running.",
    sheetName: SHEET_NAME,
  });
}

function doPost(e) {
  try {
    const rawPayload = parsePayload_(e);
    const record = normalizeRecord_(rawPayload);

    const validationError = validateRecord_(record);
    if (validationError) {
      return jsonResponse_({
        ok: false,
        error: validationError,
      });
    }

    const sheet = getOrCreateSheet_(SHEET_NAME);
    const headers = ensureHeaders_(sheet);
    const row = mapRecordToRow_(record, headers);

    sheet.appendRow(row);
    SpreadsheetApp.flush();

    let emailAlertError = null;
    try {
      sendEmailAlert();
    } catch (error) {
      emailAlertError = String(error && error.message ? error.message : error);
      Logger.log("sendEmailAlert failed: " + emailAlertError);
    }

    return jsonResponse_({
      ok: true,
      message: "Submission saved successfully.",
      submissionType: record.submissionType,
      type: record.type,
      submittedAt: record.submittedAt,
      emailAlertSent: !emailAlertError,
      emailAlertError: emailAlertError,
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: "Webhook processing failed.",
      details: String(error && error.message ? error.message : error),
    });
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Missing request body.");
  }

  const contents = e.postData.contents;
  const contentType = String(e.postData.type || "").toLowerCase();

  if (contentType.indexOf("application/json") !== -1) {
    return JSON.parse(contents);
  }

  if (contentType.indexOf("application/x-www-form-urlencoded") !== -1) {
    const payload = e.parameter && e.parameter.payload;
    if (payload) {
      return JSON.parse(payload);
    }
  }

  try {
    return JSON.parse(contents);
  } catch (error) {
    throw new Error("Unsupported content type or invalid JSON body.");
  }
}

function normalizeRecord_(payload) {
  const record = {
    submittedAt: toText_(payload.submittedAt) || new Date().toISOString(),
    type: toText_(payload.type),
    submissionType: toText_(payload.submissionType),
    name: toText_(payload.name),
    email: toText_(payload.email),
    phoneNumber: toText_(payload.phoneNumber),
    eventType: toText_(payload.eventType),
    eventDate: toText_(payload.eventDate),
    eventStartTime: toText_(payload.eventStartTime),
    eventEndTime: toText_(payload.eventEndTime),
    venueAddress: toText_(payload.venueAddress),
    venueType: toText_(payload.venueType),
    eventTheme: toText_(payload.eventTheme),
    package: toText_(payload.package),
    cost: toText_(payload.cost),
    discount: toText_(payload.discount),
    discountPercent: toText_(payload.discountPercent),
    effectiveCost: toText_(payload.effectiveCost),
    delivery: toText_(payload.delivery),
    pickupDate: toText_(payload.pickupDate),
    pickupTime: toText_(payload.pickupTime),
    deliveryDate: toText_(payload.deliveryDate),
    deliveryTime: toText_(payload.deliveryTime),
    whereDidYouHearAboutUs: toText_(payload.whereDidYouHearAboutUs),
    referralCode: toText_(payload.referralCode),
    joviraGiftCardOrVoucher: toText_(payload.joviraGiftCardOrVoucher),
    additionalInformation: toText_(payload.additionalInformation),
    entrySource: toText_(payload.entrySource),
  };

  if (!record.submissionType && record.type) {
    const key = record.type.toLowerCase();
    record.submissionType = LABEL_TO_SUBMISSION_TYPE[key] || "";
  }

  if (!record.type && record.submissionType) {
    record.type = SUBMISSION_TYPE_LABELS[record.submissionType] || "";
  }

  return record;
}

function validateRecord_(record) {
  if (
    !record.submissionType ||
    !SUBMISSION_TYPE_LABELS[record.submissionType]
  ) {
    return "Invalid or missing submissionType.";
  }

  if (!record.type) {
    return "Missing type label.";
  }

  const requiredFields = REQUIRED_FIELDS_BY_TYPE[record.submissionType] || [];
  for (let i = 0; i < requiredFields.length; i += 1) {
    const field = requiredFields[i];
    if (!toText_(record[field])) {
      return "Missing required field: " + field;
    }
  }

  if (!isValidEmail_(record.email)) {
    return "Invalid email format.";
  }

  if (
    (record.submissionType === "eventStyling" ||
      record.submissionType === "balloonInstallation" ||
      record.submissionType === "offer") &&
    !isValidTimeRange_(record.eventStartTime, record.eventEndTime)
  ) {
    return "Event End Time must be later than Event Start Time.";
  }

  if (record.submissionType === "grabAndGo") {
    const deliveryChoice = record.delivery.toLowerCase();
    if (deliveryChoice === "yes") {
      if (!record.venueAddress) {
        return "Delivery Address is required when Delivery is Yes.";
      }
      if (!record.deliveryDate || !record.deliveryTime) {
        return "Delivery Date and Delivery Time are required when Delivery is Yes.";
      }
    } else if (deliveryChoice === "no") {
      if (!record.pickupDate || !record.pickupTime) {
        return "Pickup Date and Pickup Time are required when Delivery is No.";
      }
    } else {
      return "Delivery must be Yes or No for Grab and Go submissions.";
    }
  }

  return null;
}

function mapRecordToRow_(record, headers) {
  return headers.map(function (header) {
    const key = headerToKey_(header);
    return key ? record[key] || "" : "";
  });
}

function getOrCreateSheet_(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

function ensureHeaders_(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const headerRow = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const existingHeaders = headerRow.map(function (header) {
    return toText_(header);
  });

  const hasExistingHeader = existingHeaders.some(function (header) {
    return header.length > 0;
  });

  if (!hasExistingHeader) {
    sheet
      .getRange(1, 1, 1, CANONICAL_HEADERS.length)
      .setValues([CANONICAL_HEADERS]);
    sheet.setFrozenRows(1);
    return CANONICAL_HEADERS.slice();
  }

  const normalizedExisting = {};
  for (let i = 0; i < existingHeaders.length; i += 1) {
    const normalized = normalizeHeader_(existingHeaders[i]);
    if (normalized) {
      normalizedExisting[normalized] = true;
    }
  }

  const missingHeaders = CANONICAL_HEADERS.filter(function (header) {
    return !normalizedExisting[normalizeHeader_(header)];
  });

  if (missingHeaders.length > 0) {
    const updatedHeaders = existingHeaders.concat(missingHeaders);
    sheet.getRange(1, 1, 1, updatedHeaders.length).setValues([updatedHeaders]);
    sheet.setFrozenRows(1);
    return updatedHeaders;
  }

  return existingHeaders;
}

function headerToKey_(header) {
  const key = normalizeHeader_(header);

  const map = {
    submittedat: "submittedAt",
    timestamp: "submittedAt",
    type: "type",
    submissiontype: "submissionType",
    name: "name",
    fullname: "name",
    email: "email",
    phonenumber: "phoneNumber",
    phone: "phoneNumber",
    contactnumber: "phoneNumber",
    eventtype: "eventType",
    eventdate: "eventDate",
    eventstarttime: "eventStartTime",
    eventendtime: "eventEndTime",
    venueaddress: "venueAddress",
    venuetype: "venueType",
    eventtheme: "eventTheme",
    package: "package",
    packageselected: "package",
    cost: "cost",
    discount: "discount",
    discountpercent: "discountPercent",
    effectivecost: "effectiveCost",
    delivery: "delivery",
    pickupdate: "pickupDate",
    pickuptime: "pickupTime",
    deliverydate: "deliveryDate",
    deliverytime: "deliveryTime",
    wheredidyouhearaboutus: "whereDidYouHearAboutUs",
    referralcode: "referralCode",
    joviragiftcardorvoucher: "joviraGiftCardOrVoucher",
    additionalinformation: "additionalInformation",
    entrysource: "entrySource",
  };

  return map[key] || null;
}

function normalizeHeader_(header) {
  return toText_(header)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidTimeRange_(startTime, endTime) {
  const start = toMinutes_(startTime);
  const end = toMinutes_(endTime);

  if (start === null || end === null) {
    return false;
  }

  return end > start;
}

function toMinutes_(timeString) {
  const time = toText_(timeString);
  if (!/^\d{2}:\d{2}$/.test(time)) {
    return null;
  }

  const parts = time.split(":");
  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }

  return hours * 60 + minutes;
}

function toText_(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value).trim();
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function sendEmailAlert() {
  const emailContent = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Consultation Notification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #fff7f2;
        font-family: "Trebuchet MS", "Segoe UI", Tahoma, sans-serif;
      }

      table {
        border-collapse: collapse;
      }

      .wrapper {
        width: 100%;
        background: linear-gradient(180deg, #fff7f2 0%, #ffe9df 100%);
        padding: 28px 12px;
      }

      .container {
        width: 100%;
        max-width: 620px;
        margin: 0 auto;
        background-color: #ffffff;
        border: 0px solid #f2d5c8;
        border-radius: 18px;
        overflow: hidden;
      }

      .header {
        background: linear-gradient(135deg, #f48b72 0%, #e9696b 100%);
        color: #ffffff;
        text-align: center;
        padding: 28px 24px 22px;
      }

      .header h1 {
        margin: 0;
        font-size: 28px;
        line-height: 1.2;
        letter-spacing: 0.2px;
      }

      .header p {
        margin: 10px 0 0;
        font-size: 15px;
        line-height: 1.5;
      }

      .content {
        padding: 26px 24px 16px;
        color: #5a3d35;
      }

      .greeting {
        margin: 0 0 12px;
        font-size: 18px;
        line-height: 1.4;
        font-weight: 700;
      }

      .body-text {
        margin: 0 0 12px;
        font-size: 16px;
        line-height: 1.65;
      }

      .note-card {
        margin: 18px 0;
        border: 1px solid #f1d6ca;
        border-left: 5px solid #ef886f;
        border-radius: 12px;
        background-color: #fffaf7;
        padding: 14px 14px 12px;
      }

      .note-title {
        margin: 0 0 6px;
        font-size: 13px;
        line-height: 1.4;
        text-transform: uppercase;
        letter-spacing: 0.7px;
        color: #ae5f4b;
        font-weight: 700;
      }

      .note-copy {
        margin: 0;
        font-size: 15px;
        line-height: 1.6;
      }

      .footer {
        border-top: 1px solid #f2dfd6;
        padding: 16px 24px 22px;
        color: #8c6b62;
        font-size: 13px;
        line-height: 1.6;
      }

      .signature {
        margin-top: 14px;
        color: #6f463d;
        font-size: 15px;
        line-height: 1.6;
        font-weight: 700;
      }

      @media only screen and (max-width: 640px) {
        .header h1 {
          font-size: 24px;
        }

        .content,
        .footer,
        .header {
          padding-left: 18px;
          padding-right: 18px;
        }

        .body-text,
        .note-copy {
          font-size: 15px;
        }
      }
    </style>
  </head>
  <body>
    <span
      style="
        display: none;
        font-size: 1px;
        color: #fff7f2;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
      "
    >
      New consultation request received with love and excitement.
    </span>

    <table role="presentation" width="100%" class="wrapper">
      <tr>
        <td align="center">
          <table role="presentation" class="container">
            <tr>
              <td class="header">
                <h1>Love, a new consultation is here!</h1>
                <p>Your creative magic is needed once again.</p>
              </td>
            </tr>

            <tr>
              <td class="content">
                <p class="greeting">Hi beautiful,</p>
                <p class="body-text">
                  You just received a new consultation request. Another family
                  is excited for the special touch only you can bring.
                </p>

                <div class="note-card">
                  <p class="note-title">Quick Reminder</p>
                  <p class="note-copy">
                    Take a joyful breath, review the details, and have fun
                    bringing this celebration to life.
                  </p>
                </div>

                <p class="body-text">
                  Rooting for you always. Your work turns ordinary spaces into
                  unforgettable memories.
                </p>
              </td>
            </tr>

            <tr>
              <td class="footer"><span class="signature">xoxo</span></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  MailApp.sendEmail({
    to: "jovira.sudo@gmail.com, ravinvasudev@gmail.com",
    subject: "Notification: JOVIRA | New Consultation Request",
    htmlBody: emailContent,
  });
}
