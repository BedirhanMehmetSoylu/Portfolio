const nodemailer = require('nodemailer');

// Only this origin may call the function
const allowedOrigin = 'https://bedirhan-soylu.de';

// Escapes HTML special characters so user input can never inject markup
// into the email body.
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildEmailHtml(name, email, message) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="margin:0;padding:0;">
  <div style="background-color:#f4f4f7;padding:32px 16px;font-family:'Helvetica Neue',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">

      <tr>
        <td style="background-color:#141D2F;padding:28px 32px;">
          <span style="color:#ffffff;font-size:20px;font-weight:700;">Neue Kontaktanfrage</span>
          <br>
          <span style="color:#70E61C;font-size:14px;">über bedirhan-soylu.de</span>
        </td>
      </tr>

      <tr>
        <td style="padding:28px 32px 8px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom:6px;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#9747FF;margin-right:8px;"></span>
                <span style="color:#8a8f98;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Von</span>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:20px;color:#141D2F;font-size:16px;font-weight:600;">
                ${safeName} &nbsp;<span style="color:#8a8f98;font-weight:400;font-size:14px;">&lt;${safeEmail}&gt;</span>
              </td>
            </tr>
          </table>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom:6px;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#70E61C;margin-right:8px;"></span>
                <span style="color:#8a8f98;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Nachricht</span>
              </td>
            </tr>
            <tr>
              <td style="padding:16px;background-color:#f4f4f7;border-radius:10px;color:#141D2F;font-size:15px;line-height:1.6;">
                ${safeMessage}
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:24px 32px 32px 32px;">
          <a href="mailto:${safeEmail}" style="display:inline-block;background-color:#9747FF;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 24px;border-radius:8px;">
            Antworten
          </a>
        </td>
      </tr>

      <tr>
        <td style="padding:16px 32px;background-color:#f4f4f7;border-top:1px solid #eaeaea;">
          <span style="color:#8a8f98;font-size:12px;">Automatisch generiert vom Kontaktformular auf bedirhan-soylu.de</span>
        </td>
      </tr>

    </table>
  </div>
  </body>
  </html>`;
}

// Only this origin may call the function
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Vercel parses application/json bodies automatically into req.body.
    // The Angular frontend sends Content-Type: text/plain to avoid a CORS
    // preflight, so the body may arrive as a raw string here - handle both.
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const name = (payload?.name || '').trim();
    const email = (payload?.email || '').trim();
    const message = (payload?.message || '').trim();

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address' });
    }

    // Strip newlines to prevent header injection in the reply-to field
    const safeEmail = email.replace(/[\r\n]/g, '');
    const safeName = name.replace(/[\r\n]/g, '');

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Kontaktformular" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: safeEmail,
      subject: `Kontaktanfrage von ${safeName}`,
      text: message,
      html: buildEmailHtml(safeName, safeEmail, message),
      encoding: 'utf-8',
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('sendMail error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};