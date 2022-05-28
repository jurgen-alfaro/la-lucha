const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProject,
  addProject,
  deleteProject,
  updateProject,
  deleteProjectPhoto,
  getProjectPhoto,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const uploadForProjects = require("../middleware/multerForProjects");

router.route("/").get(getProjects).post(protect, uploadForProjects, addProject);
router
  .route("/:id")
  .delete(protect, deleteProject)
  .put(protect, uploadForProjects, updateProject)
  .get(getProject);

router.route("/photo/:id").delete(deleteProjectPhoto).get(getProjectPhoto);

module.exports = router;
