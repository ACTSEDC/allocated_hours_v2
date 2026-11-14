# ACTS EDC Hour Allocation Portal

React/Vite frontend for looking up ACTS EDC participation hours from Google Sheets.

## Google Sheets + Apps Script setup

1. Open the linked spreadsheet and choose **Extensions → Apps Script**. If that page does not open, go directly to [script.google.com](https://script.google.com), click **New project**, and continue there.
2. Copy the contents of [`google-apps-script/Code.gs`](./google-apps-script/Code.gs) into the Apps Script editor. The script already contains the spreadsheet ID, so it works as a standalone project too.
3. Confirm the first row contains these headers (the existing sheet already does): `Enrollment Number`, `Name`, `EVENT NAME`, `ROLE`, `HOURS ALLOTED`, `Branch`, `Year`.
4. Deploy → New deployment → Web app. Set **Execute as** to yourself and **Who has access** to **Anyone**, then copy the `/exec` URL.
5. Create `.env.local` in this project with `VITE_SHEET_URL=the-copied-exec-url`.
6. Run `npm install`, then `npm run dev` or `npm run build`.

The site reads the latest sheet data whenever a student searches. Add or update rows in Sheets; no frontend data file needs to be changed.

## Frontend

```bash
npm install
npm run dev
```

The Events page intentionally uses text-only cards and mirrors the event names currently listed on the ACTS website. Upcoming events are not included.
