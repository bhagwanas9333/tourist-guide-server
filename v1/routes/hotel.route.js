const router = require("express").Router();
const {
  handleCreate,
  handleDelete,
  handleUpdate,
  handleGetOne,
  handleGetAll,
} = require("../controllers/hotel.controller");
const multiFileUploader = require("../helpers/middlewares/multiFileUploader");
const multiUpdateFileName = require("../helpers/middlewares/multiUpdateFileName");


router.post(
  "/",
  multiFileUploader("hotels","picture"),
  multiUpdateFileName("picture","hotels"),
  handleCreate
);
router.put(
  "/:id",
  multiFileUploader("hotels","picture"),
  multiUpdateFileName("picture", "hotels"),
  handleUpdate
);
router.delete("/:id", handleDelete);
router.get("/:id", handleGetOne);
router.get("/", handleGetAll);

module.exports = router;
