const express = require("express");
const router = express.Router();
const {
  getTanks,
  addTank,
  getTank,
  updateTank,
  deleteTankPhoto,
} = require("../controllers/waterTankController");
const uploadForTanks = require("../middleware/multerForWaterTanks");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getTanks).post(protect, uploadForTanks, addTank);
router
  .route("/:id")
  .get(getTank)
  .put(protect, uploadForTanks, updateTank)
  .delete(protect, deleteTankPhoto);
// router.route("/:id/photos").get(getPostPhotos);

module.exports = router;
