const router = require("express").Router();
require("./models/db");
router.use("/users", require("./routes/user.route"));
router.use("/places", require("./routes/place.route"));
router.use("/hotels", require("./routes/hotel.route"));

module.exports = router;
