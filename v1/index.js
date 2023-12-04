const router = require("express").Router();
require("./models/db");
router.use("/users", require("./routes/user.route"));
router.use("/auth", require("./routes/auth.route"));
router.use("/places", require("./routes/place.route"));
router.use("/hotels", require("./routes/hotel.route"));
router.use("/restaurants", require("./routes/restaurant.route"));

module.exports = router;
