const router = require("express").Router();
const {
  handleCreate,
  handleDelete,
  handleUpdate,
  handleGetOne,
  handleGetAll,
  handleBookNow,
} = require("../controllers/hotelresto.controller");

const fileUploader = require("../helpers/middlewares/fileUploader");

const multiFileUploader = require("../helpers/middlewares/multiFileUploader");
const multiUpdateFileName = require("../helpers/middlewares/multiUpdateFileName");

router.post(
  "/",
  multiFileUploader("hotelresto", "pictures"),
  multiUpdateFileName("pictures", "hotelresto"),
  handleCreate
);
router.put(
  "/:id",
  multiFileUploader("hotelresto", "pictures"),
  multiUpdateFileName("pictures", "hotelresto"),
  handleUpdate
);
router.delete("/:id", handleDelete);
router.get("/:id", handleGetOne);
router.get("/", handleGetAll);
router.post("/booknow", handleBookNow);

module.exports = router;
