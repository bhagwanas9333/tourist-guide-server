const router = require("express").Router();
const {
  handleCreate,
  handleDelete,
  handleUpdate,
  handleGetOne,
  handleGetAll,
} = require("../controllers/place.contoller");
const authorize = require("../helpers/middlewares/authorization");
// const fileUploader = require("../helpers/middlewares/fileUploader");
// const updateFileName = require("../helpers/middlewares/updateFileName");
const multiFileUploader = require("../helpers/middlewares/multiFileUploader");
const multiUpdateFileName = require("../helpers/middlewares/multiUpdateFileName");

router.post(
  "/",
  multiFileUploader("places", "pictures"),
  multiUpdateFileName("pictures", "places"),
  // fileUploader("places").single("pictures"),
  // updateFileName("pictures", "places"),
  authorize(["superadmin"]),
  handleCreate
);
router.put(
  "/:id",
  multiFileUploader("places", "pictures"),
  multiUpdateFileName("pictures", "places"),
  // fileUploader("places").single("pictures"),
  // updateFileName("pictures", "places"),
  authorize(["superadmin"]),
  handleUpdate
);
router.delete("/:id", authorize(["superadmin"]), handleDelete);
router.get("/:id", authorize(["superadmin"]), handleGetOne);
router.get("/", handleGetAll);

module.exports = router;
