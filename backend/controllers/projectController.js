const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
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

// @desc    Get project by Id
// @route   GET /api/projects/:id
// @access  Public
const getProject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q1 = "SELECT * FROM projects WHERE idproject = ?";
    const q2 = "SELECT * FROM projects_photos WHERE idproject = ?";
    const projectOutput = await pool.query(q1, [id]);
    const photos = await pool.query(q2, [id]);

    const project = projectOutput[0];

    // Add photos array to project
    project.photos = photos;

    if (!project)
      return res
        .status(400)
        .json({ message: "Failed to fetch project from 'projects' table" });

    // res.sendFile(__dirname + "/public/images/arenal.jpg");

    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc Add a project
// @route POST /api/projects
// @access Private
const addProject = asyncHandler(async (req, res) => {
  try {
    // total_cost can be null
    const { title, desc, total_cost, estimated_cost } = req.body;
    const photos = req.files || [];

    if (!title || !desc || !estimated_cost) {
      res.status(400);
      throw new Error(
        "Please enter all the required fields [title, desc, estimated_cost]"
      );
    }
    if (photos.length === 0)
      return res.status(400).json({
        error: "Please enter at least one image for the project",
      });

    let q = null;
    let resultHeaders = null;
    if (total_cost) {
      q =
        "INSERT INTO `db_lalucha`.`projects` (`title`, `desc`, `total_cost`, `estimated_cost`) VALUES (?, ?, ?, ?);";
      resultHeaders = await pool.query(q, [
        title,
        desc,
        total_cost,
        estimated_cost,
      ]);
    } else {
      q =
        "INSERT INTO `db_lalucha`.`projects` (`title`, `desc`, `estimated_cost`) VALUES (?, ?,  ?);";
      resultHeaders = await pool.query(q, [title, desc, estimated_cost]);
    }

    // If insert failed
    if (resultHeaders.affectedRows <= 0)
      throw new Error("Unable to insert data in projects table");

    const q2 =
      "INSERT INTO `db_lalucha`.`projects_photos` (`photo`, `idproject`) VALUES (?, ?);";

    if (photos.length > 0)
      for (let i = 0; i < photos.length; i++)
        await pool.query(q2, [photos[i].originalname, resultHeaders.insertId]);

    const project = await pool.query(
      "SELECT * FROM projects WHERE idproject = ?",
      [resultHeaders.insertId]
    );
    const projectPhotos = await pool.query(
      "SELECT * FROM projects_photos WHERE idproject = ?",
      [resultHeaders.insertId]
    );

    project[0].photos = projectPhotos;

    return res.status(201).json({
      message: "Project created",
      project: project[0],
    });
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error("Query failed", error.code, error.sqlMessage);
  }
});

// @desc Update a project
// @route PUT /api/projects/:id
// @access Private
const updateProject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, pdesc, total_cost, estimated_cost, is_pending } = req.body;

    console.log(req.body);

    let photos = []; // <--- empty in case there's no update to the photos

    if (req.files !== undefined)
      req.files.forEach((photo) => photos.push(photo));

    if (!title || !pdesc || !total_cost || !estimated_cost || !is_pending)
      return res.status(400).json({
        error:
          "Please enter all the fields (title, pdesc, total_cost, estimated_cost, is_pending)",
      });

    // If photos is not defined, then the same photo should be retained
    if (
      photos === undefined ||
      photos === null ||
      photos === "" ||
      photos.length === 0
    ) {
      const q = `UPDATE projects SET title = '${title}', pdesc = '${pdesc}', total_cost = '${total_cost}', estimated_cost = '${estimated_cost}', is_pending = ${is_pending} WHERE idproject = ?`;
      const resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "projects" table' });
    } else {
      // The previous photos will be retained, the new photos will be added to the existing project.
      // The text coming from pdesc should not contain single quotes (')
      const q = `UPDATE projects SET title =  '${title}', pdesc = '${pdesc}', total_cost = '${total_cost}', estimated_cost = '${estimated_cost}', is_pending = ${is_pending}  WHERE idproject = ?`,
        resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "posts" table' });

      // Add the new photos
      const q1 =
        "INSERT INTO `db_lalucha`.`projects_photos` (`photo`, `idproject`) VALUES (?, ?)";
      photos.forEach(
        async (photo) => await pool.query(q1, [photo.filename, id])
      );
    }

    const project = await pool.query(
      "SELECT * FROM projects WHERE idproject = ?",
      [id]
    );

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Update request failed on projects table", error);
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

// @desc    Delete tank photo
// @route   DELETE /api/waterTanks/:id
// @access  Private
const deleteProjectPhoto = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = "DELETE FROM projects_photos WHERE idphoto = ?";
    const photo = await pool.query(
      "SELECT photo FROM projects_photos WHERE idphoto = ? ",
      [id]
    );
    const resultHeader = await pool.query(q, [id]);

    if (resultHeader.affectedRows > 0) {
      const oldPath = path.join(
        __dirname,
        "..",
        "uploads",
        "projects",
        photo[0].photo
      );

      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Photo deleted from server: ${photo[0].photo}`);
        });
      }
      return res.status(200).json({ resultHeader: resultHeader });
    } else
      return res.status(200).json({
        error: "No se ha podido eliminar la foto del proyecto",
      });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

module.exports = {
  getProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
  deleteProjectPhoto,
};
