const nodemailer = require("nodemailer");
const { configEnv } = require("../config/config");

const sendMail = async ({
  to = configEnv.emailUser,
  subject = "test mail movies",
  html
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // {host : "smtp.gmail.com", port : 587}
      secure: false, // true for 465, false for other ports
      auth: {
        user: configEnv.emailUser, // generated ethereal user
        pass: configEnv.emailPass // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const { messageId } = await transporter.sendMail({
      from: '"👻👍🐱‍👤🐱‍🏍" <no-replay@correo.com>',
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
