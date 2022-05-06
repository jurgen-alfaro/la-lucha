const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const pool = require("../config/database");

const filesPath = path.join(__dirname, "..", "uploads", "transparencia"); // ----> ../uploads/transparencia

// @desc    Add new transparencia document
// @route   POST /api/transparencias
// @access  Private
const addDocumento = asyncHandler(async (req, res) => {
  try {
    const { dname, ddesc } = req.body;
    const ddoc = req.file.filename;

    if (!dname || !ddesc) {
      throw new Error("Please enter all fields (dname, ddesc)");
      //   return res
      //     .status(400)
      //     .json({ error: "Please enter all fields (name, desc)" });
    }

    const resultHeader = await pool.query(
      "INSERT INTO `db_lalucha`.`transparencias` (`dname`, `ddesc`, `ddoc`) VALUES (?, ?, ?);",
      [dname, ddesc, ddoc]
    );

    // If insert failed
    if (resultHeader.affectedRows <= 0)
      throw new Error("Unable to insert data in transparencias table");

    // return res
    //   .status(400)
    //   .json({ error: 'Unable to insert data in "forms" table' });

    // Get newly inserted documento
    const newDoc = await pool.query(
      `SELECT * FROM transparencias WHERE iddoc = ?`,
      [resultHeader.insertId]
    );

    return res.status(201).json({
      message: "Documento added to database",
      documento: newDoc[0],
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

// @desc    Get transparencia documentos
// @route   GET /api/transparencias
// @access  Private
const getDocumentos = asyncHandler(async (req, res) => {
  try {
    const q = "SELECT * FROM transparencias";
    const documentos = await pool.query(q);

    if (!documentos)
      return res.status(400).json({
        error: "An error occurred trying to get transparencia documentos",
      });

    return res.status(200).json(documentos);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Get transparencia documento by id
// @route   GET /api/transparencias/:id
// @access  Public
const getDocumento = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      q = "SELECT * FROM transparencias WHERE iddoc = ?",
      documento = await pool.query(q, [id]);

    if (!documento)
      return res.status(400).json({
        error: "An error occured trying to get transparencia documento by Id",
      });

    return res.status(200).json(documento[0]);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Update transparencia documento
// @route   PUT /api/transparencias/:id
// @access  Private
const updateDocumento = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      { dname, ddesc } = req.body;

    let ddoc = null; // <--- ddoc should be defined as null in case the documento's doc is not updated/changed

    if (req.file !== undefined) ddoc = req.file.filename;

    if (!dname || !ddesc)
      return res
        .status(400)
        .json({ error: "Please enter all the fields (dname, ddesc)" });

    // Get old document
    const oldDoc = await pool.query(
      "SELECT ddoc FROM transparencias WHERE iddoc = ?",
      [id]
    );

    // If ddoc is not defined, then the same doc should be retained
    if (ddoc === undefined || ddoc === null || ddoc === "") {
      const q = `UPDATE transparencias SET dname = '${dname}', ddesc = '${ddesc}'  WHERE iddoc = ?`;
      const resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "transparencias" table' });
    } else {
      // Update the documento (note that previous doc will be overwritten)
      const q = `UPDATE transparencias SET dname = '${dname}', ddesc = '${ddesc}', ddoc = '${ddoc}'  WHERE iddoc = ?`,
        resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "transparencias" table' });

      // Check if oldDoc exists in server and delete it
      if (oldDoc) {
        const oldPath = path.join(
          __dirname,
          "..",
          "uploads",
          "transparencia",
          oldDoc[0].ddoc
        ); // ---> backend\uploads\transparencia\[filename].pdf

        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(
              `Old transparencia documento deleted from server: ${oldDoc[0].ddoc}`
            );
          });
        }
      }
    }

    const updatedDocumento = await pool.query(
      "SELECT * FROM transparencias WHERE iddoc = ?",
      [id]
    );

    res.status(200).json({
      message: "Transparencia documento updated successfully",
      updatedDocumento,
    });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

// @desc    Download transparencia documento
// @route   GET /api/transparencias/:id/download
// @access  Public
const downloadDocumento = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      q = `SELECT ddoc FROM transparencias WHERE iddoc = ?`,
      doc = await pool.query(q, [id]);

    if (!doc)
      return res.status(400).json({
        error:
          "An error occured trying to download the file from transparencias table",
      });

    const fileName = doc[0].ddoc.split("-")[0],
      fileExt = doc[0].ddoc.split(".")[1];

    return res.download(
      `${filesPath}/${doc[0].ddoc}`,
      `${fileName}.${fileExt}`
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Display transparencia documento
// @route   GET /api/transparencias/:id/display
// @access  Public
const downloadDocumentoClient = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = `SELECT ddoc FROM transparencias WHERE iddoc = ?`;
    const doc = await pool.query(q, [id]);

    if (!doc)
      return res.status(400).json({
        error:
          "An error occured trying to download the file from transparencias table",
      });

    const fileName = doc[0].ddoc.split("-")[0],
      fileExt = doc[0].ddoc.split(".")[1];

    return res.download(
      `${filesPath}/${doc[0].ddoc}`,
      `${fileName}.${fileExt}`
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Display transparencia document
// @route   GET /api/transparencias/:id/display
// @access  Private
const displayDocumento = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = `SELECT ddoc FROM transparencias WHERE iddoc = ?`;
    const doc = await pool.query(q, [id]);
    const fileName = doc[0].ddoc;

    res.setHeader("Content-Type", "application/pdf");
    res.sendFile(fileName, { root: filesPath }, (err) => {
      if (err) console.log(err);
      else console.log("Sent: ", fileName);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  addDocumento,
  addDocumento,
  getDocumentos,
  getDocumento,
  updateDocumento,
  downloadDocumento,
  downloadDocumentoClient,
  displayDocumento,
};
