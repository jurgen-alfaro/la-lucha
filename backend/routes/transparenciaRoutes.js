const express = require("express");
const router = express.Router();
const {
  addDocumento,
  getDocumento,
  getDocumentos,
  updateDocumento,
  downloadDocumento,
  downloadDocumentoClient,
  displayDocumento,
} = require("../controllers/transparenciaController");
const { protect } = require("../middleware/authMiddleware");
const uploadForDocumentos = require("../middleware/multerForTransparencia");

router
  .route("/")
  .post(protect, uploadForDocumentos, addDocumento)
  .get(getDocumentos);

router
  .route("/:id")
  .get(getDocumento)
  .put(protect, uploadForDocumentos, updateDocumento);
router
  .route("/:id/download")
  .get(downloadDocumento)
  .get(downloadDocumentoClient);

router.route("/:id/display").get(displayDocumento);

module.exports = router;
