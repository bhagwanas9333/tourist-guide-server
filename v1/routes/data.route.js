const router = require("express").Router();
const { handleData } = require("../controllers/data.controller");
router.get("/",handleData);

module.exports  = router;