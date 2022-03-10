const asyncHandler = require("express-async-handler");
const pool = require("../config/database");
const upload = require("../middleware/multer");

const getUserFiles = asyncHandler(async (req, res) => {
  try {
    const userFiles = await pool.query("SELECT * FROM users_file");

    res.status(200).json({
      userFiles: userFiles,
    });
  } catch (error) {
    throw new Error("An error occured on the GET request", error);
  }
});

// @desc Add an image to the database
// @route POST /api/user-files
// @access Private
const setImage = asyncHandler(async (req, res) => {
  try {
    const imgsrc = "http://127.0.0.1:3000/images/" + req.file.filename;

    const { rows, fields } = await pool.query(
      `INSERT INTO users_file(file_src) VALUES (?)`,
      [imgsrc]
    );

    res.status(201).json({ img: imgsrc, message: "Image uploaded" });
  } catch (error) {
    console.log(error);
    throw new Error("Error in file upload", error);
  }
});

module.exports = { getUserFiles, setImage };
