const express = require("express");
const router = express.Router();

const {
  addMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
} = require("../controllers/juntaDirectivaController");
const { protect } = require("../middleware/authMiddleware");
const uploadForJuntaDirectiva = require("../middleware/multerForJuntaDirectiva");

router
  .route("/")
  .post(protect, uploadForJuntaDirectiva, addMember)
  .get(getMembers);

router
  .route("/:id")
  .get(protect, getMember)
  .put(uploadForJuntaDirectiva, updateMember)
  .delete(deleteMember);

module.exports = router;
