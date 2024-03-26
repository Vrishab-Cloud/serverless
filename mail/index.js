require("dotenv").config();

const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

module.exports = {
  sendEmail: (email, token) => {
    const emailHtml = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email Verification</title>
          </head>
          <body>
              <h1>Email Verification</h1>
              <p>Dear User,</p>
              <p>Please click the link below to verify your email address:</p>
              <p><a href="https://${process.env.DOMAIN_NAME}}/verify?token=${token}">Verify Email Address</a></p>
              <p>If you did not request this verification, please ignore this email.</p>
              <p>Thank you!</p>
          </body>
          </html>
        `;

    mg.messages
      .create(process.env.DOMAIN_NAME, {
        from: `Cloud <no-reply@${process.env.DOMAIN_NAME}>`,
        to: [email],
        subject: "Email Verification",
        html: emailHtml,
      })
      .then((msg) => console.log(msg))
      .catch((err) => console.log(err));
  },
};
