import config from "../config.js";
import nodemailer from "nodemailer";

async function createTransporter() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });

  return transporter;
}

async function sendVerificationEmail(email, token) {
  const verificationLink = `${config.baseUrl}/user/verify/${token}`;

  const transporter = await createTransporter();

  const mailOptions = {
    from: `Verify Account <${config.emailUser}>`,
    to: email,
    subject: "Verify your email",
    html: `<p>Click the following link to verify your email:</p>
           <a href="${verificationLink}">${verificationLink}</a>`,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Email sent:", info.messageId);
}

export default sendVerificationEmail;
;