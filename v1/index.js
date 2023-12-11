const router = require("express").Router();
require("./models/db");
router.use("/users", require("./routes/user.route"));
router.use("/auth", require("./routes/auth.route"));
router.use("/places", require("./routes/place.route"));
router.use("/data", require("./routes/data.route"));

module.exports = router;
