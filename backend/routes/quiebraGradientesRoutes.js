const express = require("express");
const router = express.Router();
const {
  getGradientes,
  addGradiente,
  getGradiente,
  deleteGradientePhoto,
  updateGradiente,
  deleteGradiente,
} = require("../controllers/quiebraGradientesController");
const { protect } = require("../middleware/authMiddleware");
const uploadForGradientes = require("../middleware/multerForGradientes");

router
  .route("/")
  .get(getGradientes)
  .post(protect, uploadForGradientes, addGradiente);
router
  .route("/:id")
  .get(getGradiente)
  .put(protect, uploadForGradientes, updateGradiente)
  .delete(protect, deleteGradiente);

router.route("/photo/:id").delete(protect, deleteGradientePhoto);

module.exports = router;
