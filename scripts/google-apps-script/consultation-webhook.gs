const SHEET_NAME = "Consultation Submissions";

const SUBMISSION_TYPE_LABELS = {
  consultation: "Free Consultation",
  eventStyling: "Event Styling Package",
  balloonInstallation: "Balloon Installation Package",
  grabAndGo: "Grab 'n Go Package",
  offer: "Special Offer",
};

const LABEL_TO_SUBMISSION_TYPE = {
  "free consultation": "consultation",
  consultation: "consultation",
  "event styling package": "eventStyling",
  "event styling": "eventStyling",
  "balloon installation package": "balloonStyling",
  "balloon installation": "balloonInstallation",
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
  balloonStyling: [
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

    return jsonResponse_({
      ok: true,
      message: "Submission saved successfully.",
      submissionType: record.submissionType,
      type: record.type,
      submittedAt: record.submittedAt,
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
      record.submissionType === "balloonStyling" ||
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
    evenththeme: "eventTheme",
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
