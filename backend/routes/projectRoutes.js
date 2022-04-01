const express = require("express");
const router = express.Router();
const {
  getProjects,
  addProject,
  deleteProject,
  editProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getProjects).post(protect, addProject);
router.route("/:id").delete(deleteProject).put(editProject);

module.exports = router;
