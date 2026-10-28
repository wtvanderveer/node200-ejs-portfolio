const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const KEY_FILE = process.env.GOOGLE_KEY_FILE || path.join(__dirname, '..', 'credentials.json');

// Service account credentials come from either the GOOGLE_CREDENTIALS env var
// (the whole JSON key as one string) or a credentials.json file.
function getAuthOptions() {
    if (process.env.GOOGLE_CREDENTIALS) {
        return { credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS), scopes: SCOPES };
    }
    return { keyFile: KEY_FILE, scopes: SCOPES };
}

function isConfigured() {
    const hasCredentials = Boolean(process.env.GOOGLE_CREDENTIALS) || fs.existsSync(KEY_FILE);
    return Boolean(process.env.SHEET_ID) && hasCredentials;
}

async function appendContact({ firstName, lastName, email }) {
    const auth = new google.auth.GoogleAuth(getAuthOptions());
    const sheets = google.sheets({ version: 'v4', auth });

    // append() adds the row below the last row with data, so there is no need
    // to count the existing rows first.
    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: process.env.SHEET_RANGE || 'Sheet1!A:D',
        // RAW stores the text as typed, so a submitted "=FORMULA()" is not run.
        valueInputOption: 'RAW',
        requestBody: {
            values: [[firstName, lastName, email, new Date().toISOString()]],
        },
    });
}

module.exports = { isConfigured, appendContact };
