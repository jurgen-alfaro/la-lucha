const express = require("express");
const router = express.Router();
const { getAsada, updateAsada } = require("../controllers/asadaController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getAsada);
router.route("/:id").put(protect, updateAsada);

module.exports = router;
