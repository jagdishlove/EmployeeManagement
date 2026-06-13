const nodemailer = require("nodemailer");

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  } else {
    // Dev fallback: log to console
    transporter = {
      sendMail: async (mailOptions) => {
        console.log("=== EMAIL (dev mode) ===");
        console.log("To:", mailOptions.to);
        console.log("Subject:", mailOptions.subject);
        console.log("Body:", mailOptions.html || mailOptions.text);
        console.log("========================");
        return { messageId: "dev-" + Date.now() };
      },
    };
  }

  return transporter;
}

async function sendEmail({ to, subject, html }) {
  const transport = getTransporter();
  const from = process.env.SMTP_FROM || "noreply@kairos.com";
  return transport.sendMail({ from, to, subject, html });
}

module.exports = { sendEmail };
