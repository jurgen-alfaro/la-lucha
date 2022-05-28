const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const pool = require("../config/database");

const filesPath = path.join(__dirname, "..", "uploads", "reglamentos"); // ----> ../resources/static/assets/uploads/

// @desc    Add new reglamento
// @route   POST /api/reglamentos
// @access  Private
const addReglamentos = asyncHandler(async (req, res) => {
  try {
    const { rname, rdesc } = req.body;
    const rdoc = req.file.filename;

    if (!rname || !rdesc) {
      throw new Error("Please enter all fields (rname, rdesc)");
      //   return res
      //     .status(400)
      //     .json({ error: "Please enter all fields (name, desc)" });
    }

    const resultHeader = await pool.query(
      "INSERT INTO `db_lalucha`.`reglamentos` (`rname`, `rdesc`, `rdoc`) VALUES (?, ?, ?);",
      [rname, rdesc, rdoc]
    );

    // If insert failed
    if (resultHeader.affectedRows <= 0)
      throw new Error("Unable to insert data in reglamentos table");

    // return res
    //   .status(400)
    //   .json({ error: 'Unable to insert data in "forms" table' });

    // Get newly inserted reglamento
    const newReglamento = await pool.query(
      `SELECT * FROM reglamentos WHERE idreglamento = ?`,
      [resultHeader.insertId]
    );

    return res.status(201).json({
      message: "Reglamento added to database",
      reglamento: newReglamento[0],
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

// @desc    Get reglamentos
// @route   GET /api/reglamentos
// @access  Private
const getReglamentos = asyncHandler(async (req, res) => {
  try {
    const q = "SELECT * FROM reglamentos";
    const reglamentos = await pool.query(q);

    if (!reglamentos)
      return res
        .status(400)
        .json({ error: "An error occurred trying to get reglamentos" });

    return res.status(200).json(reglamentos);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Get reglamentos by id
// @route   GET /api/reglamentos/:id
// @access  Public
const getReglamento = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      q = "SELECT * FROM reglamentos WHERE idreglamento = ?",
      reglamento = await pool.query(q, [id]);

    if (!reglamento)
      return res
        .status(400)
        .json({ error: "An error occured trying to get reglamento by Id" });

    return res.status(200).json(reglamento[0]);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Update reglamento
// @route   PUT /api/reglamento/:id
// @access  Private
const updateReglamento = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      { rname, rdesc } = req.body;

    let rdoc = null; // <--- rdoc should be defined as null in case the reglamentos's doc is not updated/changed

    if (req.file !== undefined) rdoc = req.file.filename;

    if (!rname || !rdesc)
      return res
        .status(400)
        .json({ error: "Please enter all the fields (rname, rdesc)" });

    // Get old document
    const oldDoc = await pool.query(
      "SELECT rdoc FROM reglamentos WHERE idreglamento = ?",
      [id]
    );

    // If fdoc is not defined, then the same doc should be retained
    if (rdoc === undefined || rdoc === null || rdoc === "") {
      const q = `UPDATE reglamentos SET rname = '${rname}', rdesc = '${rdesc}'  WHERE idreglamento = ?`;
      const resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "reglamentos" table' });
    } else {
      // Update the form (note that previous doc will be overwritten)
      const q = `UPDATE reglamentos SET rname = '${rname}', rdesc = '${rdesc}', rdoc = '${rdoc}'  WHERE idreglamento = ?`,
        resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "reglamentos" table' });

      // Check if oldDoc exists in server and delete it
      if (oldDoc) {
        const oldPath = path.join(
          __dirname,
          "..",
          "uploads",
          "reglamentos",
          oldDoc[0].rdoc
        ); // ---> backend\uploads\reglamentos\[filename].pdf

        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(
              `Old reglamento deleted from server: ${oldDoc[0].rdoc}`
            );
          });
        }
      }
    }

    const updatedReglamento = await pool.query(
      "SELECT * FROM reglamentos WHERE idreglamento = ?",
      [id]
    );

    res
      .status(200)
      .json({ message: "Reglamento updated successfully", updatedReglamento });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

// @desc    Download reglamento
// @route   GET /api/reglamentos/:id/download
// @access  Public
const downloadReglamentoDocument = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      q = `SELECT rdoc FROM reglamentos WHERE idreglamento = ?`,
      doc = await pool.query(q, [id]);

    if (!doc)
      return res.status(400).json({
        error:
          "An error occured trying to download the file from reglamentos table",
      });

    const fileName = doc[0].rdoc.split("-")[0],
      fileExt = doc[0].rdoc.split(".")[1];

    return res.download(
      `${filesPath}/${doc[0].rdoc}`,
      `${fileName}.${fileExt}`
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Display reglamento
// @route   GET /api/reglamentos/:id/display
// @access  Public
const downloadReglamentoDocumentClient = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = `SELECT rdoc FROM reglamentos WHERE idreglamento = ?`;
    const doc = await pool.query(q, [id]);

    if (!doc)
      return res.status(400).json({
        error:
          "An error occured trying to download the file from reglamentos table",
      });

    const fileName = doc[0].rdoc.split("-")[0],
      fileExt = doc[0].rdoc.split(".")[1];

    return res.download(
      `${filesPath}/${doc[0].rdoc}`,
      `${fileName}.${fileExt}`
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Download curriculum
// @route   GET /api/reglamentos/:id/cv
// @access  Private
const displayReglamento = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = `SELECT rdoc FROM reglamentos WHERE idreglamento = ?`;
    const doc = await pool.query(q, [id]);
    const fileName = doc[0].rdoc;

    res.setHeader("Content-Type", "application/pdf");
    res.sendFile(fileName, { root: filesPath }, (err) => {
      if (err) console.log(err);
      else console.log("Sent: ", fileName);
    });
  } catch (error) {
    console.log(error);
  }
});

// @desc    Delete reglamento by Id
// @route   DELETE /api/reglamentos/:id
// @access  Private
const deleteReglamento = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = "DELETE FROM reglamentos WHERE idreglamento = ?";
    // Get old document
    const oldDoc = await pool.query(
      "SELECT rdoc FROM reglamentos WHERE idreglamento = ?",
      [id]
    );
    const resultHeader = await pool.query(q, [id]);

    // Check if oldDoc exists in server and delete it
    if (oldDoc) {
      const oldPath = path.join(
        __dirname,
        "..",
        "uploads",
        "reglamentos",
        oldDoc[0].rdoc
      ); // ---> backend\uploads\reglamentos\[filename].pdf

      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Old reglamento deleted from server: ${oldDoc[0].rdoc}`);
        });
      }
    }

    if (resultHeader.affectedRows > 0)
      return res.status(200).json({ resultHeader: resultHeader });
    else
      return res
        .status(200)
        .json({ error: "No se ha podido eliminar el registro del reglamento" });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

module.exports = {
  addReglamentos,
  getReglamento,
  getReglamentos,
  updateReglamento,
  downloadReglamentoDocument,
  downloadReglamentoDocumentClient,
  displayReglamento,
  deleteReglamento,
};
