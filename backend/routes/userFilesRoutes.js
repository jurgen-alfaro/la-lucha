const express = require("express");
const upload = require("../plugin/multer");

const router = express.Router();
const {
  setImage,
  getUserFiles,
} = require("../controllers/userFilesController");

router.route("/").get(getUserFiles).post(upload, setImage);

module.exports = router;
