const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const SENDGRID_API =
  "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";
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: SENDGRID_API,
    },
  })
);
exports.sendEmail = async (emailId, link) => {
  await transporter
    .sendMail({
      to: emailId,
      from: "myntralive@gmail.com",
      subject: "Live",
      html: `<h3>${link}</h3>`,
    })
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      return err;
    });
};
exports.sendEmailInfluencer = async (emailId, content) => {
  await transporter
    .sendMail({
      to: emailId,
      from: "myntralive@gmail.com",
      subject: "Live",
      html: `<h3>${content}</h3>`,
    })
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      return err;
    });
};
