const express = require("express");
const router = express.Router();
const {
  addJob,
  getJobs,
  getJob,
  updateJob,
  downloadCurriculum,
  displayCurriculum,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");
const uploadForJobs = require("../middleware/multerForJobs");

router.route("/").post(uploadForJobs, addJob).get(protect, getJobs);
router.route("/:id").get(protect, getJob).put(updateJob);
router.route("/:id/download").get(protect, downloadCurriculum);
router.route("/:id/cv").get(displayCurriculum);

module.exports = router;
