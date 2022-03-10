const express = require("express");
const router = express.Router();
const { addForm } = require("../controllers/formController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.route("/").post(upload, addForm);

module.exports = router;
