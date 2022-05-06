const asyncHandler = require("express-async-handler");
const pool = require("../config/database");

// @desc    Get all photos
// @route   GET /api/photos
// @access  Public
const getPhotos = asyncHandler(async (req, res) => {
  try {
    const q = "SELECT * FROM uploaded_photos",
      photos = await pool.query(q);

    if (!photos)
      return res
        .status(400)
        .json({ error: "An error occurred trying to get photos" });

    return res.status(200).json(photos);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

module.exports = {
  getPhotos,
};
