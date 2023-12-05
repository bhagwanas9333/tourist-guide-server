const router = require("express").Router();
const {
  handleCreate,
  handleDelete,
  handleUpdate,
  handleGetOne,
  handleGetAll,
} = require("../controllers/hotel.controller");

const fileUploader = require("../helpers/middlewares/fileUploader");
const updateFileName = require("../helpers/middlewares/updateFileName");

router.post(
  "/",
  fileUploader("hotels").single("picture"),
  updateFileName("picture", "hotels"),
  handleCreate
);
router.put(
  "/:id",
  fileUploader("hotels").single("picture"),
  updateFileName("picture", "hotels"),
  handleUpdate
);
router.delete("/:id", handleDelete);
router.get("/:id", handleGetOne);
router.get("/", handleGetAll);

module.exports = router;
