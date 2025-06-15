// steps/gmailStep.js
const { google } = require('googleapis');

function createRawEmail(to, subject, body) {
  const email = [
    `To: ${to}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    body,
  ].join('\n');

  return Buffer.from(email)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export default async function runGmailStep(config, token) {
  if (!token) throw new Error('Missing OAuth token for Gmail step');

  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials({
    access_token: token.access_token,
    refresh_token: token.refresh_token,
    expiry_date: token.expires_at,
  });

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  const raw = createRawEmail(config.to, config.subject, config.body);

  const response = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw },
  });

  return response.data;
}


