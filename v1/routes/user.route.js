const router = require("express").Router();
const {
  handleCreate,
  handleDelete,
  handleUpdate,
  handleGetOne,
  handleGetAll,
} = require("../controllers/user.controller");
const fileUploader = require("../helpers/middlewares/fileUploader");
const updateFileName = require("../helpers/middlewares/updateFileName");

router.post(
  "/",
  fileUploader("avatar").single("avatar"),
  updateFileName("avatar", "avatar"),
  handleCreate
);

router.put(
  "/:id",
  fileUploader("avatar").single("avatar"),
  updateFileName("avatar", "avatar"),
  handleUpdate
);
router.delete("/:id", handleDelete);
router.get("/:id", handleGetOne);
router.get("/", handleGetAll);

module.exports = router;
