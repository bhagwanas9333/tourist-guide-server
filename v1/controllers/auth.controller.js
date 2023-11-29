const sendEmail = require("../helpers/email");
const { createToken } = require("../helpers/token");
const authService = require("../services/auth.service");
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
  handlePasswordReset(req, res) {
    const { email } = req.body;
    authService
      ?.passwordResetLink(email)
      .then((result) => {
        // console.log("result", result);
        //generate a link
        // link baseRouter+token //http://3000+change-password+token
        const { origin } = req.headers;
        const token = createToken(
          {
            email: result?.email,
            id: result?._id,
            role: result?.role,
            type: "access",
            origin,
          },
          60 * 10
        );
        //  available  then generate link
        const link = `${origin}/reset-password/${token}`;

        //send email
        const to = email;
        const from = "bhagwan8284@gmail.com";
        const subject = "Password reset link for TOPPER HOTEL";
        const text = `Dear Customer,
  You can reset the password by using below link.
  The link is valid for 10 minutes only
  COpy the link and paste in the address of the web browser.
  ${link}`;

        const html = `
  <p>Dear Customer ,</p>
  <p> You can reset the password by using below link.</p>
  <p> The link is valid for 10 minutes only</p>
  <a href='${link}'>Reset link</a>`;

        console.log(link);
        sendEmail({ to, from, html, text, subject })
          .then((result) => {
            res.status(200).send({ message: "email send", data: {} });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send({ message: "email not sending", error });
          });
      })
      .catch((error) => {
        console.error(error);
        res, status(404).send({ message: "User in not available", error });
      });
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
