const router = require("express").Router();
const {
  handleCreate,
  handleDelete,
  handleUpdate,
  handleGetOne,
  handleGetAll,
} = require("../controllers/restaurant.controller");

const fileUploader = require("../helpers/middlewares/fileUploader");
const updateFileName = require("../helpers/middlewares/updateFileName");

router.post(
  "/",
  fileUploader("restaurants").single("picture"),
  updateFileName("picture", "restaurants"),
  handleCreate
);
router.put(
  "/:id",
  fileUploader("restaurants").single("picture"),
  updateFileName("picture", "restaurants"),
  handleUpdate
);
router.delete("/:id", handleDelete);
router.get("/:id", handleGetOne);
router.get("/", handleGetAll);

module.exports = router;
