const router = require("express").Router();
const {
  handleCreate,
  handleDelete,
  handleUpdate,
  handleGetOne,
  handleGetAll,
  handleBookNow,
} = require("../controllers/hotelresto.controller");
const authorize = require("../helpers/middlewares/authorization");

const fileUploader = require("../helpers/middlewares/fileUploader");

const multiFileUploader = require("../helpers/middlewares/multiFileUploader");
const multiUpdateFileName = require("../helpers/middlewares/multiUpdateFileName");

router.post(
  "/",
  multiFileUploader("hotelresto", "pictures"),
  multiUpdateFileName("pictures", "hotelresto"),
  // authorize(["superadmin"]),
  handleCreate
);
router.put(
  "/:id",
  multiFileUploader("hotelresto", "pictures"),
  multiUpdateFileName("pictures", "hotelresto"),
  // authorize(["superadmin"]),
  handleUpdate
);
router.delete("/:id",
  // authorize(["superadmin"]),
  handleDelete);
router.get("/:id", handleGetOne);
router.get("/", handleGetAll);
router.post("/booknow", handleBookNow);

module.exports = router;
