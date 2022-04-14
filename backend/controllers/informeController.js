const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const pool = require("../config/database");

const filesPath = path.join(__dirname, "..", "uploads", "informes"); // ----> ../resources/static/assets/uploads/

// @desc    Add new informe
// @route   POST /api/informes
// @access  Private
const addInforme = asyncHandler(async (req, res) => {
  try {
    const { iname, idesc } = req.body;
    const idoc = req.file.filename;

    if (!iname || !idesc) {
      throw new Error("Please enter all fields (iname, idesc)");
      //   return res
      //     .status(400)
      //     .json({ error: "Please enter all fields (name, desc)" });
    }

    const resultHeader = await pool.query(
      "INSERT INTO `db_lalucha`.`informes` (`iname`, `idesc`, `idoc`) VALUES (?, ?, ?);",
      [iname, idesc, idoc]
    );

    // If insert failed
    if (resultHeader.affectedRows <= 0)
      throw new Error("Unable to insert data in informes table");

    // return res
    //   .status(400)
    //   .json({ error: 'Unable to insert data in "forms" table' });

    // Get newly inserted informe
    const newInforme = await pool.query(
      `SELECT * FROM informes WHERE idinforme = ?`,
      [resultHeader.insertId]
    );

    return res.status(201).json({
      message: "Informe added to database",
      informe: newInforme[0],
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

// @desc    Get informes
// @route   GET /api/informes
// @access  Private
const getInformes = asyncHandler(async (req, res) => {
  try {
    const q = "SELECT * FROM informes";
    const informes = await pool.query(q);

    if (!informes)
      return res
        .status(400)
        .json({ error: "An error occurred trying to get informes" });

    return res.status(200).json(informes);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Get informes by id
// @route   GET /api/informes/:id
// @access  Public
const getInforme = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      q = "SELECT * FROM informes WHERE idinforme = ?",
      informe = await pool.query(q, [id]);

    if (!informe)
      return res
        .status(400)
        .json({ error: "An error occured trying to get informe by Id" });

    return res.status(200).json(informe[0]);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Update informes
// @route   PUT /api/informes/:id
// @access  Private
const updateInforme = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      { iname, idesc } = req.body;

    let idoc = null; // <--- idoc should be defined as null in case the informe's doc is not updated/changed

    if (req.file !== undefined) idoc = req.file.filename;

    if (!iname || !idesc)
      return res
        .status(400)
        .json({ error: "Please enter all the fields (iname, idesc)" });

    // Get old informe doc
    const oldDoc = await pool.query(
      "SELECT idoc FROM informes WHERE idinforme = ?",
      [id]
    );

    // If idoc is not defined, then the same doc should be retained
    if (idoc === undefined || idoc === null || idoc === "") {
      const q = `UPDATE informes SET iname = '${iname}', idesc = '${idesc}'  WHERE idinforme = ?`;
      const resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "informes" table' });
    } else {
      // Update the informe (note that previous doc will be overwritten)
      const q = `UPDATE informes SET iname = '${iname}', idesc = '${idesc}', idoc = '${idoc}'  WHERE idinforme = ?`,
        resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "informes" table' });

      // Check if oldDoc exists in server and delete it
      if (oldDoc) {
        const oldPath = path.join(
          __dirname,
          "..",
          "uploads",
          "informes",
          oldDoc[0].idoc
        ); // ---> backend\uploads\informes\[filename].pdf

        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(
              `Old informe document deleted from server: ${oldDoc[0].idoc}`
            );
          });
        }
      }
    }

    const updatedInforme = await pool.query(
      "SELECT * FROM informes WHERE idinforme = ?",
      [id]
    );

    res
      .status(200)
      .json({ message: "Informe updated successfully", updatedInforme });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

// @desc    Download informe
// @route   GET /api/informes/:id/download
// @access  Public
const downloadInformeDocument = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      q = `SELECT idoc FROM informes WHERE idinforme = ?`,
      doc = await pool.query(q, [id]);

    if (!doc)
      return res.status(400).json({
        error:
          "An error occured trying to download the file from informes table",
      });

    const fileName = doc[0].idoc.split("-")[0],
      fileExt = doc[0].idoc.split(".")[1];

    return res.download(
      `${filesPath}/${doc[0].idoc}`,
      `${fileName}.${fileExt}`
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Download Informe from Client-Side
// @route   GET /api/informes/:id/display
// @access  Public
const downloadInformeDocumentClient = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = `SELECT idoc FROM informes WHERE idinforme = ?`;
    const doc = await pool.query(q, [id]);

    if (!doc)
      return res.status(400).json({
        error:
          "An error occured trying to download the file from informes table",
      });

    const fileName = doc[0].idoc.split("-")[0],
      fileExt = doc[0].idoc.split(".")[1];

    return res.download(
      `${filesPath}/${doc[0].idoc}`,
      `${fileName}.${fileExt}`
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Display informe
// @route   GET /api/reglamentos/:id/cv
// @access  Private
const displayInforme = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const q = `SELECT idoc FROM informes WHERE idinforme = ?`;
    const doc = await pool.query(q, [id]);

    const fileName = doc[0].idoc;

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
  addInforme,
  getInforme,
  getInformes,
  updateInforme,
  downloadInformeDocument,
  downloadInformeDocumentClient,
  displayInforme,
};
