const asyncHandler = require("express-async-handler");
const pool = require("../config/database");

// @desc Get projects
// @route GET /api/projects
// @access Public
const getProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await pool.query("SELECT * FROM projects");

    res.status(200).json({
      projects: projects,
    });
  } catch (error) {
    throw new Error("An error occured on the GET request", error);
  }
});

// @desc Add a project
// @route POST /api/projects
// @access Private
const addProject = asyncHandler(async (req, res) => {
  try {
    const { title, desc, total_cost, estimated_cost, is_pending } = req.body;

    if (!title || !desc || !total_cost) {
      res.status(400);
      throw new Error(
        "Please enter all the required fields [title, desc, total_cost]"
      );
    }

    const newProject = {
      title,
      desc,
      total_cost,
      estimated_cost,
      is_pending,
    };

    const resultHeader = await pool.query(`INSERT INTO projects SET ?`, [
      newProject,
    ]);

    res.status(201).json({ project: newProject, message: "Project created" });
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error("Query failed", error.code, error.sqlMessage);
  }
});

// @desc Update a project
// @route PUT /api/projects/:id
// @access Private
const editProject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, total_cost, estimated_cost, is_pending } = req.body;

    if (!title || !desc || !total_cost || !estimated_cost || !is_pending) {
      res.status(400);
      throw new Error("Please enter all the fields");
    }

    const updProject = {
      title,
      desc,
      total_cost,
      estimated_cost,
      is_pending,
    };

    const updatedProject = await pool.query(
      "UPDATE projects SET ? WHERE idproject = ?",
      [updProject, id]
    );

    if (!updatedProject) {
      res.status(400);
      throw new Error("UPDATE failed");
    }

    res.status(200).json({ updatedProject: updProject });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Edit request failed", error);
  }
});

// @desc Delete a project
// @route DELETE /api/projects/:id
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM projects WHERE idproject = ?", [id]);

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Delete request failed", error);
  }
});

module.exports = { getProjects, addProject, editProject, deleteProject };
