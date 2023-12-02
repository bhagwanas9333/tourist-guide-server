const router = require("express").Router();
const {
  handleCreate,
  handleDelete,
  handleUpdate,
  handleGetOne,
  handleGetAll,
} = require("../controllers/user.controller");
const authorize = require("../helpers/middlewares/authorization");
const fileUploader = require("../helpers/middlewares/fileUploader");
const updateFileName = require("../helpers/middlewares/updateFileName");

router.post(
  "/",
  fileUploader("avatar").single("avatar"),
  updateFileName("avatar", "avatar"),
  // authorize(["superadmin", "admin"]),
  handleCreate
);

router.put(
  "/:id",
  fileUploader("avatar").single("avatar"),
  updateFileName("avatar", "avatar"),
  // authorize(["superadmin", "admin"]),
  handleUpdate
);
router.delete(
  "/:id",
  // authorize(["superadmin", "admin"]),
  handleDelete
);
router.get(
  "/:id",
  // authorize(["superadmin", "admin"]),
  handleGetOne
);
router.get(
  "/",
  // authorize(["superadmin", "admin"]),
  handleGetAll
);

module.exports = router;
