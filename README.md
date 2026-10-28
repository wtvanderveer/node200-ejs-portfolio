# Travis Vanderveer Portfolio

A personal portfolio site built with Node, Express, and EJS. It has a home page, a portfolio page, and a contact form that saves submissions to a Google Sheet.

## Run it locally

```
npm install
npm start
```

Then open http://localhost:8080.

Use `npm run dev` to restart the server automatically when files change.

## Google Sheets setup

1. Create a Google Cloud service account, enable the Google Sheets API, and download its JSON key.
2. Save the key as `credentials.json` in the project root.
3. Share your Google Sheet with the service account's `client_email` as an Editor.
4. Copy `.env.example` to `.env` and set `SHEET_ID`.

Without these, the site still runs but contact submissions are not saved.

## Tests

```
npm test
```

## Deploying to Render

- Build command: `npm install`
- Start command: `npm start`
- Environment variables: `SHEET_ID`, and `GOOGLE_CREDENTIALS` set to the full contents of the JSON key.
