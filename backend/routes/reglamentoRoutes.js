const express = require("express");
const router = express.Router();
const {
  addReglamentos,
  getReglamento,
  getReglamentos,
  updateReglamento,
  downloadReglamentoDocument,
  downloadReglamentoDocumentClient,
  displayReglamento,
  deleteReglamento,
} = require("../controllers/reglamentoController");
const { protect } = require("../middleware/authMiddleware");
const uploadForReglamentos = require("../middleware/multerForReglamentos");

router
  .route("/")
  .post(protect, uploadForReglamentos, addReglamentos)
  .get(getReglamentos);

router
  .route("/:id")
  .get(getReglamento)
  .put(protect, uploadForReglamentos, updateReglamento)
  .delete(protect, deleteReglamento);
router
  .route("/:id/download")
  .get(downloadReglamentoDocument)
  .get(downloadReglamentoDocumentClient);

router.route("/:id/display").get(displayReglamento);

module.exports = router;
