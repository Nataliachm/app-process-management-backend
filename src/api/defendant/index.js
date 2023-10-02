const router = require("express").Router();
const {
  createDefendantController,
  listDefendantsController,
  showDefendantController,
  updateDefendantController,
  deleteDefendantController,
} = require("./defendant.controller");

router.route("/").post(createDefendantController);
router.route("/").get(listDefendantsController);
router.route("/:id").get(showDefendantController);
router.route("/:id").put(updateDefendantController);
router.route("/:id").delete(deleteDefendantController);

module.exports = router;
