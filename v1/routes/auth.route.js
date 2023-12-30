const router = require("express").Router();

const {
  handleLogin,
  handlePasswordReset,
  handleRefreshToken,
  handleTokenValidation,
  handleBookNow,
} = require("../controllers/auth.controller");

router.post("/login", handleLogin);
router.post("/password-reset-link", handlePasswordReset);
router.post("/validate-token", handleTokenValidation);
router.post("/refresh-token", handleRefreshToken);

module.exports = router;
