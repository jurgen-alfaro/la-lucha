const express = require("express");
const router = express.Router();
const {
  addInforme,
  getInforme,
  getInformes,
  updateInforme,
  downloadInformeDocument,
  downloadInformeDocumentClient,
  displayInforme,
  deleteInforme,
} = require("../controllers/informeController");
const { protect } = require("../middleware/authMiddleware");
const uploadForInformes = require("../middleware/multerForInformes");

router.route("/").post(protect, uploadForInformes, addInforme).get(getInformes);

router
  .route("/:id")
  .get(getInforme)
  .put(protect, uploadForInformes, updateInforme)
  .delete(protect, deleteInforme);
router
  .route("/:id/download")
  .get(downloadInformeDocument)
  .get(downloadInformeDocumentClient);

router.route("/:id/display").get(displayInforme);

module.exports = router;
