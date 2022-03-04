const express = require("express");
const router = express.Router();
const {
  registerSuggestion,
  getSuggestions,
  editSuggestion,
} = require("../controllers/suggestionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerSuggestion).get(protect, getSuggestions);
router.route("/:id").put(protect, editSuggestion);

module.exports = router;
