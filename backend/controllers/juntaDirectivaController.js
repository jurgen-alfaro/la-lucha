const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const pool = require("../config/database");

// @desc    Add new member to Junta Directiva
// @route   POST /api/junta
// @access  Private
const addMember = asyncHandler(async (req, res) => {
  try {
    const { name, last_name, position, vigency } = req.body;
    const photo = req.file.filename;

    if (!name || !last_name || !position || !vigency) {
      throw new Error(
        "Please enter all fields (name, last_name, positioon, vigency)"
      );
    }

    const q =
      "INSERT INTO `" +
      process.env.MYSQL_DATABASE +
      "`.`junta_directiva` (`name`, `last_name`, `position`, `vigency`, `photo`) VALUES (?, ?, ?, ?, ?)";
    const resultHeader = await pool.query(q, [
      name,
      last_name,
      position,
      vigency,
      photo,
    ]);

    // If insert failed
    if (resultHeader.affectedRows <= 0)
      throw new Error("Unable to insert data in junta_directiva table");

    // Get newly inserted member
    const member = await pool.query(
      "SELECT * FROM junta_directiva WHERE idmember = ?",
      [resultHeader.insertId]
    );

    return res
      .status(201)
      .json({ message: "Member added to Junta Directiva", member: member[0] });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

// @desc    Get members
// @route   GET /api/junta
// @access  Public
const getMembers = asyncHandler(async (req, res) => {
  try {
    const q = "SELECT * FROM junta_directiva";
    const members = await pool.query(q);

    if (!members)
      return res.status(400).json({
        error: "An error occurred trying to get members from Junta Directiva",
      });

    return res.status(200).json(members);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Get member by Id
// @route   GET /api/junta/:id
// @access  Private
const getMember = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = "SELECT * FROM junta_directiva WHERE idmember = ?";
    const member = await pool.query(q, [id]);

    if (!member)
      return res.status(400).json({
        message: "Unable to fetch member from junta_directiva table",
      });

    return res.status(200).json(member[0]);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Update member by Id
// @route   PUT /api/junta/:id
// @access  Private
const updateMember = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, last_name, position, vigency } = req.body;

    let photo = null; // <--- fdoc should be defined as null in case the member's photo is not updated/changed

    if (req.file !== undefined) photo = req.file.filename;

    if (!name || !last_name || !position || !vigency)
      return res.status(400).json({
        error:
          "Please enter all the fields (name, last_name, position, vigency)",
      });

    // Get previous photo
    const prevPhoto = await pool.query(
      "SELECT photo FROM junta_directiva WHERE idmember = ?",
      [id]
    );

    // If prevPhoto is not defined, then the same photo should be retained
    if (photo === undefined || photo === null || photo === "") {
      const q = `UPDATE junta_directiva SET name = '${name}', last_name = '${last_name}', position = '${position}', vigency = '${vigency}'  WHERE idmember = ?`;
      const resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "junta_directiva" table' });
    } else {
      // Update the member (note that previous photo will be overwritten)
      const q = `UPDATE junta_directiva SET name = '${name}', last_name = '${last_name}', position = '${position}', vigency = '${vigency}', photo = '${photo}'  WHERE idmember = ?`,
        resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "junta_directiva" table' });

      // Check if prevPhoto exists in server and delete it
      if (prevPhoto) {
        const oldPath = path.join(
          __dirname,
          "../uploads/junta",
          prevPhoto[0].photo
        ); // ---> uploads\junta\[filename].[jpg, jpeg, png]

        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(
              `Previous photo deleted from server: ${prevPhoto[0].photo}`
            );
          });
        }
      }
    }

    const member = await pool.query(
      "SELECT * FROM junta_directiva WHERE idmember = ?",
      [id]
    );

    res.status(200).json({ message: "Member updated successfully", member });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Delete member by Id
// @route   DELETE /api/junta/:id
// @access  Private
const deleteMember = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = "DELETE FROM junta_directiva WHERE idmember = ?";

    // Get previous photo
    const prevPhoto = await pool.query(
      "SELECT photo FROM junta_directiva WHERE idmember = ?",
      [id]
    );

    const resultHeader = await pool.query(q, [id]);

    if (resultHeader.affectedRows <= 0) {
      return res
        .status(200)
        .json({ error: "No se ha podido eliminar el registro del miembro" });
    } else {
      // Check if prevPhoto exists in server and delete it
      if (prevPhoto) {
        const oldPath = path.join(
          __dirname,
          "../uploads/junta",
          prevPhoto[0].photo
        ); // ---> uploads\junta\[filename].[jpg, jpeg, png]

        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(
              `Previous photo deleted from server: ${prevPhoto[0].photo}`
            );
          });
        }
      }
      return res.status(200).json({ resultHeader: resultHeader });
    }
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

module.exports = {
  addMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
};
