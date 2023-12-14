const { createToken } = require("../helpers/token");
const authService = require("../services/auth.service");
const { createTransporter } = require("../helpers/email");
require("dotenv").config({
  path: "./config/.env",
});

const autoCtrl = {
  handleLogin(req, res) {
    const { origin } = req.headers;
    authService
      ?.userLogin({ ...req?.body, origin })
      .then(({ accessToken, refreshToken, data }) => {
        // add token in response header
        res.set("x-accesstoken", accessToken);
        res.set("x-refreshtoken", refreshToken);
        res?.status(200).send({ message: "Login successful", data });
      })
      .catch((error) => {
        res?.status(500).send({ message: error, error: null });
      });
  }, //handleLogin
  async handlePasswordReset(req, res) {
    const { email } = req.body;
    try {
      const userResult = await authService.passwordResetLink(email);

      // generate a link
      const { origin } = req.headers;
      const token = createToken(
        {
          email: userResult?.email,
          id: userResult?._id,
          role: userResult?.role,
          type: "access",
          origin,
        },
        60 * 10
      );

      const link = `${origin}/reset-password/${token}`;

      // send email
      const to = email;
      const from = "bhagwan9282@gmail.com";
      const subject = "Password reset link for Trip Tastic";
      const text = `Dear Customer,
        You can reset the password by using the link below.
        The link is valid for 10 minutes only.
        Copy the link and paste it into the address bar of your web browser.
        ${link}`;

      const html = `
        <p>Dear Customer,</p>
        <p>You can reset the password by using the link below.</p>
        <p>The link is valid for 10 minutes only.</p>
        <a href='${link}'>Reset link</a>`;

      // Create transporter
      const transporter = createTransporter();

      // Send email
      transporter.sendMail(
        {
          from,
          to,
          subject,
          text,
          html,
        },
        (error, emailResult) => {
          if (error) {
            console.error("Error sending email:", error);
            res.status(500).send({ message: "Error sending email", error });
          } else {
            // console.log("Email sent:", emailResult);
            res.status(200).send({ message: "Email sent", data: emailResult });
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error generating reset link", error });
    }
  }, //handlePasswordReset

  async handleTokenValidation(req, res) {
    const { token } = req.body;
    const payload = await authService.validateToken(token).catch(console.error);
    if (payload) {
      res
        .status(200)
        .send({ message: "Valid token ", data: { id: payload?.id } });
    } else {
      res.status(500).send({ message: "invalid Token", error: null });
    }
  }, //handleTokenValidation
  async handleRefreshToken(req, res) {
    const refreshT = req?.body?.token;
    const { origin: clientDomain } = req.headers;
    const tokens = await authService.refreshToken({ refreshT, clientDomain });
    if (!tokens) {
      // if invalid token
      res
        .status(403)
        .send({ message: "Session expired ! login again", error: null });
    } else {
      res.status(200).send({ message: "Token refreshed", data: tokens });
    }
  },
};

module.exports = autoCtrl;
