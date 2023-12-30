const nodemailer = require("nodemailer");
require("dotenv").config({
  path: "./config/.env",
});

function createTransportering() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.ADMIN_USER_ID,
      pass: process.env.ADMIN_USER_PASS,
    },
  });
}

module.exports = { createTransportering };
