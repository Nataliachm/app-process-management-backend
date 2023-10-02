const router = require("express").Router();
const {
  createCourtController,
  listCourtsController,
  showCourtController,
  deleteCourtController,
} = require("./court.controller");

router.route("/").post(createCourtController);
router.route("/").get(listCourtsController);
router.route("/:id").get(showCourtController);
router.route("/:id").delete(deleteCourtController);

module.exports = router;
