const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const pool = require("../config/database");

// @desc Get quiebra gradientes
// @route GET /api/quiebraGradientes
// @access Public
const getGradientes = asyncHandler(async (req, res) => {
  try {
    const gradientes = await pool.query("SELECT * FROM gradientes");

    if (!gradientes)
      return res
        .status(400)
        .json({ error: "An error occurred trying to get gradientes" });

    const photos = await pool.query("SELECT * FROM uploaded_photos");

    gradientes.forEach((gradiente) => {
      // Add property 'photos' to the gradientes
      gradiente.photos = [];
      photos.forEach((photo) => {
        if (gradiente.idgradientes === photo.idgradientes)
          gradiente.photos.push(photo);
      });
    });

    res.status(200).json({ gradientes });
  } catch (error) {
    throw new Error("An error occured on the GET request", error);
  }
});

// @desc    Get quiebra gradiente by Id
// @route   GET /api/quiebraGradientes/:id
// @access  Public
const getGradiente = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q1 = "SELECT * FROM gradientes WHERE idgradientes = ?";
    const q2 = "SELECT * FROM uploaded_photos WHERE idgradientes = ?";
    const gradienteOutput = await pool.query(q1, [id]);
    const photos = await pool.query(q2, [id]);

    const gradiente = gradienteOutput[0];

    // Add photos array to tank
    gradiente.photos = photos;

    if (!gradiente)
      return res
        .status(400)
        .json({ message: "Failed to fetch gradiente from 'gradientes' table" });

    // res.sendFile(__dirname + "/public/images/arenal.jpg");

    return res.status(200).json(gradiente);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Add quiebra gradiente
// @route   POST /api/quiebraGradientes
// @access  Private
const addGradiente = asyncHandler(async (req, res) => {
  try {
    const { name, location, capacity, costo, proveedor } = req.body;
    const photos = req.files || [];

    if (!name || !location || !capacity || !costo || !proveedor)
      return res.status(400).json({
        error:
          "Please enter all fields (name, location, capacity, costo, proveedor)",
      });

    if (photos.length === 0)
      return res.status(400).json({
        error: "Please enter at least one image for the quiebra gradientes",
      });

    const q =
      "INSERT INTO `" +
      process.env.MYSQL_DATABASE +
      "`.`gradientes` (`name`, `location`, `capacity`, `costo`, `proveedor`) VALUES (?, ?, ?, ?, ?);";
    const resultHeaders = await pool.query(q, [
      name,
      location,
      capacity,
      costo,
      proveedor,
    ]);

    // If insert failed
    if (resultHeaders.affectedRows <= 0)
      throw new Error("Unable to insert data in 'gradientes' table");

    const q2 =
      "INSERT INTO `" +
      process.env.MYSQL_DATABASE +
      "`.`uploaded_photos` (`photo`, `idgradientes`) VALUES (?, ?);";

    if (photos.length > 0)
      for (let i = 0; i < photos.length; i++)
        await pool.query(q2, [photos[i].filename, resultHeaders.insertId]);

    const gradiente = await pool.query(
      "SELECT * FROM gradientes WHERE idgradientes = ?",
      [resultHeaders.insertId]
    );
    const gradientePhotos = await pool.query(
      "SELECT * FROM uploaded_photos WHERE idgradientes = ?",
      [resultHeaders.insertId]
    );

    gradiente[0].photos = gradientePhotos;

    return res.status(201).json({
      message: "Quiebra Gradientes created",
      gradiente: gradiente[0],
    });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

// @desc    Update quiebra gradientes by Id
// @route   PUT /api/quiebraGradientes/:id
// @access  Private
const updateGradiente = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, capacity, costo, proveedor } = req.body;

    let photos = []; // <--- photos should be defined as null in case the tanks's photo is not updated/changed

    if (req.files !== undefined)
      req.files.forEach((photo) => photos.push(photo));

    if (!name || !location || !capacity || !costo || !proveedor)
      return res.status(400).json({
        error:
          "Please enter all the fields (name, location, capacity, costo, proveedor)",
      });

    // If photos is not defined, then the same photo should be retained
    if (
      photos === undefined ||
      photos === null ||
      photos === "" ||
      photos.length === 0
    ) {
      const q = `UPDATE gradientes SET name = '${name}', location = '${location}', capacity = '${capacity}', costo = '${costo}', proveedor = '${proveedor}' WHERE idgradientes = ?`;
      const resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "gradientes" table' });
    } else {
      // Update the tank
      // The previous photos will be retained, the new photos will be added to the existing tank's photos.
      const q = `UPDATE gradientes SET name = '${name}', location = '${location}', capacity = '${capacity}', costo = '${costo}', proveedor = '${proveedor}'  WHERE idgradientes = ?`,
        resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "gradientes" table' });

      // Add the new photos
      const q1 =
        "INSERT INTO `" +
        process.env.MYSQL_DATABASE +
        "`.`uploaded_photos` (`photo`, `idgradientes`) VALUES (?, ?)";
      photos.forEach(async (photo) => {
        const resultHeader = await pool.query(q1, [photo.filename, id]);
      });
    }

    const gradiente = await pool.query(
      "SELECT * FROM gradientes WHERE idgradientes = ?",
      [id]
    );

    res
      .status(200)
      .json({ message: "Quiebra gradientes updated successfully", gradiente });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Delete gradiente photo
// @route   DELETE /api/quiebraGradientes/:id
// @access  Private
const deleteGradientePhoto = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = "DELETE FROM uploaded_photos WHERE idphoto = ?";
    const photo = await pool.query(
      "SELECT photo FROM uploaded_photos WHERE idphoto = ? ",
      [id]
    );
    const resultHeader = await pool.query(q, [id]);

    if (resultHeader.affectedRows > 0) {
      const oldPath = path.join(__dirname, "../uploads", photo[0].photo);

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
        error: "No se ha podido eliminar la foto del quiebra gradientes",
      });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

// @desc    Delete quiebra gradientes by Id
// @route   DELETE /api/quiebraGradientes/:id
// @access  Private
const deleteGradiente = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = "DELETE FROM gradientes WHERE idgradientes = ?";
    const q2 = "DELETE FROM uploaded_photos WHERE idgradientes = ?";
    // Get old document
    const oldDocs = await pool.query(
      "SELECT photo FROM uploaded_photos WHERE idgradientes = ?",
      [id]
    );

    const resultHeader = await pool.query(q, [id]);
    pool.query(q2, [id]); // Delete the photo entries in db

    oldDocs.forEach((item) => {
      // Check if oldDoc exists in server and delete it
      if (item) {
        const oldPath = path.join(__dirname, "../uploads", item.photo); // ---> uploads\[photo].<png|jpg|jpeg>

        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(`Photo deleted from server: ${item.photo}`);
          });
        }
      }
    });

    if (resultHeader.affectedRows > 0)
      return res.status(200).json({ resultHeader: resultHeader });
    else
      return res.status(200).json({
        error: "No se ha podido eliminar el registro del quiebra gradientes",
      });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

module.exports = {
  getGradientes,
  getGradiente,
  addGradiente,
  deleteGradientePhoto,
  updateGradiente,
  deleteGradiente,
};
