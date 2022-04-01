const express = require("express");
const router = express.Router();
const {
  addForm,
  getForms,
  getForm,
  updateForm,
  downloadFormDocument,
  downloadFormDocumentClient,
  displayForm,
} = require("../controllers/formController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.route("/").post(protect, upload, addForm).get(getForms);

router.route("/:id").get(getForm).put(protect, upload, updateForm);
router
  .route("/:id/download")
  .get(downloadFormDocument)
  .get(downloadFormDocumentClient);

router.route("/:id/display").get(displayForm);

module.exports = router;
