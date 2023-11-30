const router = require("express").Router();
const {
  handleCreate,
  handleDelete,
  handleUpdate,
  handleGetOne,
  handleGetAll,
} = require("../controllers/place.contoller");
const fileUploader = require("../helpers/middlewares/fileUploader");
const multiFileUploader = require("../helpers/middlewares/multiFileUploader");
const multiUpdateFileName = require("../helpers/middlewares/multiUpdateFileName");

router.post(
  "/",
  multiFileUploader("places", "pictures"),
  multiUpdateFileName("pictures", "places"),
  handleCreate
);
router.put(
  "/:id",
  multiFileUploader("places", "pictures"),
  multiUpdateFileName("pictures", "places"),
  handleUpdate
);
router.delete("/:id", handleDelete);
router.get("/:id", handleGetOne);
router.get("/", handleGetAll);

module.exports = router;
