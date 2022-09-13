const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const pool = require("../config/database");
const filesPath = path.join(
  __dirname,
  "..",
  "resources",
  "static",
  "assets",
  "uploads"
); // ----> ../resources/static/assets/uploads/

// @desc    Add new form
// @route   POST /api/forms
// @access  Private
const addForm = asyncHandler(async (req, res) => {
  try {
    const { fname, fdesc } = req.body;
    const fdoc = req.file.filename;

    if (!fname || !fdesc) {
      throw new Error("Please enter all fields (name, desc)");
      return res
        .status(400)
        .json({ error: "Please enter all fields (name, desc)" });
    }

    const resultHeader = await pool.query(
      "INSERT INTO `" +
        process.env.MYSQL_DATABASE +
        ".`forms` (`fname`, `fdesc`, `fdoc`) VALUES (?, ?, ?);",
      [fname, fdesc, fdoc],
      (err) => console.log(err)
    );

    // If insert failed
    if (resultHeader.affectedRows <= 0)
      throw new Error("Unable to insert data in forms table");

    // return res
    //   .status(400)
    //   .json({ error: 'Unable to insert data in "forms" table' });

    // Get newly inserted form
    const newForm = await pool.query(`SELECT * FROM forms WHERE idforms = ?`, [
      resultHeader.insertId,
    ]);

    return res
      .status(201)
      .json({ message: "Form added to database", form: newForm[0] });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

// @desc    Get forms
// @route   GET /api/forms
// @access  Private
const getForms = asyncHandler(async (req, res) => {
  try {
    const q = "SELECT * FROM forms";
    const forms = await pool.query(q);

    if (!forms)
      return res
        .status(400)
        .json({ error: "An error occurred trying to get forms" });

    return res.status(200).json(forms);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Get form by id
// @route   GET /api/forms/:id
// @access  Private
const getForm = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      q = "SELECT * FROM forms WHERE idforms = ?",
      form = await pool.query(q, [id]);

    if (!form)
      return res
        .status(400)
        .json({ error: "An error occured trying to get form by Id" });

    return res.status(200).json(form[0]);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Update form
// @route   PUT /api/forms/:id
// @access  Private
const updateForm = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      { fname, fdesc } = req.body;

    let fdoc = null; // <--- fdoc should be defined as null in case the form's doc is not updated/changed

    if (req.file !== undefined) fdoc = req.file.filename;

    if (!fname || !fdesc)
      return res
        .status(400)
        .json({ error: "Please enter all the fields (fname, fdesc)" });

    // Get old document
    const oldDoc = await pool.query(
      "SELECT fdoc FROM forms WHERE idforms = ?",
      [id]
    );

    // If fdoc is not defined, then the same doc should be retained
    if (fdoc === undefined || fdoc === null || fdoc === "") {
      const q = `UPDATE forms SET fname = '${fname}', fdesc = '${fdesc}'  WHERE idforms = ?`;
      const resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "forms" table' });
    } else {
      // Update the form (note that previous doc will be overwritten)
      const q = `UPDATE forms SET fname = '${fname}', fdesc = '${fdesc}', fdoc = '${fdoc}'  WHERE idforms = ?`,
        resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "forms" table' });

      // Check if oldDoc exists in server and delete it
      if (oldDoc) {
        const oldPath = path.join(
          __dirname,
          "..",
          "resources",
          "static",
          "assets",
          "uploads",
          oldDoc[0].fdoc
        ); // ---> backend\resources\static\assets\uploads\[filename].pdf

        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(`Old document deleted from server: ${oldDoc[0].fdoc}`);
          });
        }
      }
    }

    const updatedForm = await pool.query(
      "SELECT * FROM forms WHERE idforms = ?",
      [id]
    );

    res.status(200).json({ message: "Form updated successfully", updatedForm });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

// @desc    Download form
// @route   GET /api/forms/:id/download
// @access  Public
const downloadFormDocument = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      q = `SELECT fdoc FROM forms WHERE idforms = ?`,
      doc = await pool.query(q, [id]);

    if (!doc)
      return res
        .status(400)
        .json({ error: "An error occured trying to download the file" });

    const fileName = doc[0].fdoc.split("-")[0],
      fileExt = doc[0].fdoc.split(".")[1];

    return res.download(
      `${filesPath}/${doc[0].fdoc}`,
      `${fileName}.${fileExt}`
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Display form
// @route   GET /api/forms/:id/display
// @access  Public
const downloadFormDocumentClient = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = `SELECT fdoc FROM forms WHERE idforms = ?`;
    const doc = await pool.query(q, [id]);

    if (!doc)
      return res
        .status(400)
        .json({ error: "An error occured trying to download the file" });

    const fileName = doc[0].fdoc.split("-")[0],
      fileExt = doc[0].fdoc.split(".")[1];

    return res.download(
      `${filesPath}/${doc[0].fdoc}`,
      `${fileName}.${fileExt}`
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Download curriculum
// @route   GET /api/jobs/:id/cv
// @access  Private
const displayForm = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = `SELECT fdoc FROM forms WHERE idforms = ?`;
    const doc = await pool.query(q, [id]);

    const fileName = doc[0].fdoc;

    res.setHeader("Content-Type", "application/pdf");
    res.sendFile(fileName, { root: filesPath }, (err) => {
      if (err) console.log(err);
      else console.log("Sent: ", fileName);
    });
  } catch (error) {
    console.log(error);
  }
});

// @desc    Delete form by Id
// @route   DELETE /api/forms/:id
// @access  Private
const deleteForm = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = "DELETE FROM forms WHERE idforms = ?";
    // Get old document
    const oldDoc = await pool.query(
      "SELECT fdoc FROM forms WHERE idforms = ?",
      [id]
    );

    const resultHeader = await pool.query(q, [id]);

    // Check if oldDoc exists in server and delete it
    if (oldDoc) {
      const oldPath = path.join(__dirname, "uploads", "forms", oldDoc[0].fdoc); // ---> uploads\forms\[filename].pdf

      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Old document deleted from server: ${oldDoc[0].fdoc}`);
        });
      }
    }

    if (resultHeader.affectedRows > 0)
      return res.status(200).json({ resultHeader: resultHeader });
    else
      return res
        .status(200)
        .json({ error: "No se ha podido eliminar el registro del formulario" });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

module.exports = {
  addForm,
  getForms,
  getForm,
  updateForm,
  downloadFormDocument,
  downloadFormDocumentClient,
  displayForm,
  deleteForm,
};
