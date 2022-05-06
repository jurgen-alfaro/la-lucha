const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const pool = require("../config/database");

// @desc    Get asada
// @route   GET /api/asada/
// @access  Public
const getAsada = asyncHandler(async (req, res) => {
  try {
    const q1 = "SELECT * FROM asada";
    const asada = await pool.query(q1);

    if (!asada)
      return res
        .status(400)
        .json({ message: "Failed to fetch information from 'asada' table" });

    return res.status(200).json(asada[0]);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Update asada
// @route   PUT /api/asada/:id
// @access  Private
const updateAsada = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {
      mision,
      vision,
      historia,
      schedule,
      extension,
      address,
      users,
      tanks,
      gradientes,
    } = req.body;

    if (
      !mision ||
      !vision ||
      !extension ||
      !schedule ||
      !users ||
      !tanks ||
      !gradientes ||
      !address ||
      !historia
    )
      return res.status(400).json({
        error:
          "Please enter all the fields (mision, vision, historia, schedule, extension, direccion, users, tanks, gradientes)",
      });

    // Update the asada
    const q = `UPDATE asada SET mision = '${mision}', vision = '${vision}', historia = '${historia}', schedule = '${schedule}', address = '${address}', extension = '${extension}', users = '${users}', tanks = '${tanks}', gradientes = '${gradientes}' WHERE idasada = ?`;
    const resultHeaders = await pool.query(q, [id]);

    if (resultHeaders.affectedRows <= 0)
      return res
        .status(400)
        .json({ error: 'No fields were updated in "asada" table' });

    const asada = await pool.query("SELECT * FROM asada", [id]);

    res.status(200).json({ message: "ASADA updated successfully", asada });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

module.exports = {
  getAsada,
  updateAsada,
};
