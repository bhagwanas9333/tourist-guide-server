const router = require("express").Router();
require("./models/db");
router.use("/users",require("./routes/user.route"))
router.use("/auth",require("./routes/auth.route"))


module.exports = router;
