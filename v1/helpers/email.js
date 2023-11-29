const sgMail = require("@sendgrid/mail");

const sendEmail = async (msg) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const response = await sgMail.send(msg);
  console.log("Email response :",response );
  return response;
};
module.exports = sendEmail;


