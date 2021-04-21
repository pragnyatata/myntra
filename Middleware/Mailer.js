const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "myntralive@gmail.com",
    pass: "Myntra@01",
    clientId:
      "1064581402672-0n0020e32ll357b2flrnmtkb102o28vr.apps.googleusercontent.com",
    clientSecret: "4FKvT1DeLRVgqtXAv71sDfVi",
    refreshToken:
      "1//04ctP46VZazQWCgYIARAAGAQSNwF-L9IrFovhLjBWotDGFvPUPp2apL0EcBo_NDaHvjPjW3CKUn3cuOPx70UFQWelMKRfU6ME3ds",
  },
});
exports.sendEmail = async (emailId, link) => {
  console.log("came here");
  let mailOptions = {
    to: emailId,
    from: "myntralive@gmail.com",
    subject: "Live",
    html: content,
  };
  await transporter
    .sendMail(mailOptions)
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      return err;
    });
};

exports.sendEmailInfluencer = async (emailId, content) => {
  let mailOptions = {
    to: emailId,
    from: "myntralive@gmail.com",
    subject: "Live",
    html: content,
  };
  await transporter
    .sendMail(mailOptions)
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      return err;
    });
};
