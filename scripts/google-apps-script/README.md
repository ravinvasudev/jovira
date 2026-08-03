# Google Apps Script Webhook for Jovira Form Submissions

This script receives Jovira form submissions from the Next.js API route and appends rows into one unified Google Sheet.

## Files

- `consultation-webhook.gs`: Production webhook handler (`doPost`) + health check (`doGet`).

## What It Does

- Validates incoming JSON payloads before writing to the sheet.
- Supports all submission types:
  - `consultation`
  - `eventStyling`
  - `balloonStyling`
  - `grabAndGo`
  - `offer`
- Enforces grab-and-go delivery logic:
  - Delivery = `Yes` => requires `deliveryDate` and `deliveryTime`
  - Delivery = `No` => requires `pickupDate` and `pickupTime`
- Verifies event start/end time ordering for event, balloon, and offer submissions.
- Auto-creates missing sheet headers in a stable canonical order.
- Maps common header naming variations to payload keys.

## Expected Payload Keys

The webhook accepts the payload sent by `src/app/api/consultation/route.ts`, including:

- `type`
- `submissionType`
- `name`
- `email`
- `phoneNumber`
- `eventType`
- `eventDate`
- `eventStartTime`
- `eventEndTime`
- `venueAddress`
- `venueType`
- `eventTheme`
- `package`
- `cost`
- `discount`
- `discountPercent`
- `effectiveCost`
- `delivery`
- `pickupDate`
- `pickupTime`
- `deliveryDate`
- `deliveryTime`
- `whereDidYouHearAboutUs`
- `referralCode`
- `joviraGiftCardOrVoucher`
- `additionalInformation`
- `entrySource`
- `submittedAt`

## Deploy Steps

1. Create or open your Google Sheet.
2. Go to `Extensions` -> `Apps Script`.
3. Replace default script content with `consultation-webhook.gs`.
4. Save and deploy as Web App:
   - `Deploy` -> `New deployment`
   - Type: `Web app`
   - Execute as: `Me`
   - Who has access: `Anyone` (or `Anyone with link`, based on your policy)
5. Copy the Web App URL.
6. Set `GOOGLE_SHEETS_WEBHOOK_URL` in your Next.js environment to that URL.
7. Redeploy/restart your Next.js app.

## Quick Test

Use this from your terminal (replace URL):

```bash
curl -X POST "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "type":"Free Consultation",
    "submissionType":"consultation",
    "name":"Test User",
    "email":"test@example.com",
    "phoneNumber":"+1 555 000 0000",
    "additionalInformation":"Testing webhook",
    "submittedAt":"2026-07-29T12:00:00.000Z"
  }'
```

Expected response:

```json
{"ok":true,"message":"Submission saved successfully.","submissionType":"consultation","type":"Free Consultation","submittedAt":"2026-07-29T12:00:00.000Z"}
```

## Notes

- Apps Script returns JSON payloads but does not reliably return custom HTTP status codes for these responses.
- Validation is duplicated here intentionally as a safety net after server-side validation.
