const router = require("express").Router();
const {
  createPlaintiffController,
  listPlaintiffsController,
  showPlaintiffController,
  updatePlaintiffController,
  deletePlaintiffController,
} = require("./plaintiff.controller");

router.route("/").post(createPlaintiffController);
router.route("/").get(listPlaintiffsController);
router.route("/:id").get(showPlaintiffController);
router.route("/:id").put(updatePlaintiffController);
router.route("/:id").delete(deletePlaintiffController);

module.exports = router;
