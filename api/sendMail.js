const nodemailer = require('nodemailer');

// Only this origin may call the function
const allowedOrigin = 'https://bedirhan-soylu.de';

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
      html: `<p><strong>Von:</strong> ${safeName} (${safeEmail})</p><p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('sendMail error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
