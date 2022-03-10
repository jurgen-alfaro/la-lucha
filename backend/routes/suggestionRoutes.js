const express = require("express");
const router = express.Router();
const {
  registerSuggestion,
  getSuggestions,
  getSuggestion,
  updateSuggestion,
} = require("../controllers/suggestionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerSuggestion).get(protect, getSuggestions);

router.route("/:id").get(protect, getSuggestion).put(protect, updateSuggestion);

module.exports = router;
