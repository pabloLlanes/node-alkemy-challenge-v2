const nodemailer = require("nodemailer");

const sendMail = async ({
  to = "process.env.EMAIL_USER",
  subject = "Nuevo contacto WEB",
  html
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // {host : "smtp.gmail.com", port : 587}
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const { messageId } = await transporter.sendMail({
      from: '"👻👍🐱‍👤🐱‍🏍" <no-remplay@correo.com>',
      to,
      subject,
      html
    });

    return messageId;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = { sendMail };
