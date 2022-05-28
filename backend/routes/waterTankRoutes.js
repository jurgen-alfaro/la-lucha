const express = require("express");
const router = express.Router();
const {
  getTanks,
  addTank,
  getTank,
  updateTank,
  deleteTankPhoto,
  deleteTank,
} = require("../controllers/waterTankController");
const uploadForTanks = require("../middleware/multerForWaterTanks");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getTanks).post(protect, uploadForTanks, addTank);
router
  .route("/:id")
  .get(getTank)
  .put(protect, uploadForTanks, updateTank)
  .delete(protect, deleteTank);

router.route("/photo/:id").delete(protect, deleteTankPhoto);

module.exports = router;
