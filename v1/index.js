const router = require("express").Router();
require("./models/db");
router.use("/users",require("./routes/user.route"))

module.exports = router;
