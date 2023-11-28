const router = require("express").Router();
const {
  handleCreate,
  handleDelete,
  handleUpdate,
  handleGetOne,
  handleGetAll,
} = require("../controllers/place.contoller");
const fileUploader = require("../helpers/middlewares/fileUploader");
const updateFileName = require("../helpers/middlewares/updateFileName");

router.post(
  "/",
  fileUploader("places").single("picture"),
  updateFileName("picture", "places"),
  handleCreate
);
router.put(
  "/:id",
  fileUploader("places").single("picture"),
  updateFileName("picture", "places"),
  handleUpdate
);
router.delete("/:id", handleDelete);
router.get("/:id", handleGetOne);
router.get("/", handleGetAll);

module.exports = router;
