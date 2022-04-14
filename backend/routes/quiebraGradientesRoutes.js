const express = require("express");
const router = express.Router();
const {
  getGradientes,
  addGradiente,
  getGradiente,
  deleteGradientePhoto,
  updateGradiente,
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
  .delete(protect, deleteGradientePhoto)
  .put(protect, uploadForGradientes, updateGradiente);

module.exports = router;
