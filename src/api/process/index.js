const router = require("express").Router();
const {
  createProcessController,
  listProcessesController,
  showProcessController,
  updateProcessController,
  deleteProcessController,
} = require("./process.controller");

router.route("/").post(createProcessController);
router.route("/").get(listProcessesController);
router.route("/:id").get(showProcessController);
router.route("/:id").put(updateProcessController);
router.route("/:id").delete(deleteProcessController);

module.exports = router;
