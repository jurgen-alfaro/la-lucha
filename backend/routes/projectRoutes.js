const express = require("express");
const router = express.Router();
const {
  getProjects,
  setProject,
  deleteProject,
  editProject,
} = require("../controllers/projectController");

router.route("/").get(getProjects).post(setProject);
router.route("/:id").delete(deleteProject).put(editProject);

module.exports = router;
