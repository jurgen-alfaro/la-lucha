const asyncHandler = require("express-async-handler");
const pool = require("../config/database");

// @desc    Add new form
// @route   POST /api/forms
// @access  Private
const addForm = asyncHandler(async (req, res) => {
  try {
    const { fname, fdesc } = req.body;
    const fdoc = req.file.filename;

    if (!fname || !fdesc) {
      return res
        .status(400)
        .json({ error: "Please enter all fields (name, desc)" });
    }

    const resultHeader = await pool.query(
      "INSERT INTO `db_lalucha`.`forms` (`fname`, `fdesc`, `fdoc`) VALUES (?, ?, ?);",
      [fname, fdesc, fdoc]
    );

    // If insert failed
    if (resultHeader.affectedRows <= 0)
      return res
        .status(400)
        .json({ error: 'Unable to insert data in "forms" table' });

    // Get newly inserted form
    const newForm = await pool.query(`SELECT * FROM forms WHERE idforms = ?`, [
      resultHeader.insertId,
    ]);

    res
      .status(201)
      .json({ message: "Form added to database", form: newForm[0] });
  } catch (err) {
    return res.status(400).json({ error: err, rts: "aqui" });
  }
});

// @desc    Get forms
// @route   GET /api/forms
// @access  Private
// @todo

module.exports = {
  addForm,
};
