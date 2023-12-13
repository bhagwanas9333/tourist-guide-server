const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  
  service: "gmail",
  auth: {
    user: "bhagwans9333@gmail.com", // your Gmail address
    pass: "KusumBhagwan$9282", // your App Password or Gmail password
  },
});

module.exports = transporter;
// // Email content
// const mailOptions = {
//   from: 'your-email@gmail.com', // sender address
//   to: 'recipient@example.com', // recipient's email address
//   subject: 'Password reset link for TOPPER HOTEL', // Subject line
//   text: `Dear Customer,
//     You can reset the password by using below link.
//     The link is valid for 10 minutes only.
//     Copy the link and paste it into the address bar of your web browser.
//     ${link}`,
//   html: `
//     <p>Dear Customer,</p>
//     <p>You can reset the password by using below link.</p>
//     <p>The link is valid for 10 minutes only.</p>
//     <a href='${link}'>Reset link</a>`,
// };

// // Send email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send({ message: 'Email not sent', error });
//   } else {
//     console.log('Email sent:', info.response);
//     res.status(200).send({ message: 'Email sent successfully', data: {} });
//   }
// });
