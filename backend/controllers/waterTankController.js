const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const pool = require("../config/database");

// @desc    Add water tank
// @route   POST /api/waterTanks
// @access  Private
const addTank = asyncHandler(async (req, res) => {
  try {
    const { name, location, capacity } = req.body;
    const photos = req.files || [];

    if (!name || !location || !capacity)
      return res.status(400).json({
        error: "Please enter all fields (name, location, capacity)",
      });

    if (photos.length === 0)
      return res.status(400).json({
        error: "Please enter at least one image for the water tank",
      });

    const q =
      "INSERT INTO `db_lalucha`.`tanks` (`name`, `location`, `capacity`) VALUES (?, ?, ?);";
    const resultHeaders = await pool.query(q, [name, location, capacity]);

    // If insert failed
    if (resultHeaders.affectedRows <= 0)
      throw new Error("Unable to insert data in 'tanks' table");

    const q2 =
      "INSERT INTO `db_lalucha`.`uploaded_photos` (`photo`, `idtanks`) VALUES (?, ?);";

    if (photos.length > 0)
      for (let i = 0; i < photos.length; i++)
        await pool.query(q2, [photos[i].filename, resultHeaders.insertId]);

    const tank = await pool.query("SELECT * FROM tanks WHERE idtanks = ?", [
      resultHeaders.insertId,
    ]);
    const tankPhotos = await pool.query(
      "SELECT * FROM uploaded_photos WHERE idtanks = ?",
      [resultHeaders.insertId]
    );

    tank[0].photos = tankPhotos;

    return res.status(201).json({
      message: "Water tank created",
      tank: tank[0],
    });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

// @desc    Get water tanks
// @route   GET /api/waterTanks
// @access  Public
const getTanks = asyncHandler(async (req, res) => {
  try {
    const q = "SELECT * FROM tanks";
    const tanks = await pool.query(q);

    if (!tanks)
      return res
        .status(400)
        .json({ error: "An error occurred trying to get posts" });

    const photos = await pool.query("SELECT * FROM uploaded_photos");

    tanks.forEach((tank) => {
      // Add property 'photos' to the tanks
      tank.photos = [];
      photos.forEach((photo) => {
        if (tank.idtanks === photo.idtanks) tank.photos.push(photo);
      });
    });

    return res.status(200).json({ tanks });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Get water tank by Id
// @route   GET /api/waterTanks/:id
// @access  Public
const getTank = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q1 = "SELECT * FROM tanks WHERE idtanks = ?";
    const q2 = "SELECT * FROM uploaded_photos WHERE idtanks = ?";
    const tankOutput = await pool.query(q1, [id]);
    const photos = await pool.query(q2, [id]);

    const tank = tankOutput[0];

    // Add photos array to tank
    tank.photos = photos;

    if (!tank)
      return res
        .status(400)
        .json({ message: "Failed to fetch tank from 'tanks' table" });

    // res.sendFile(__dirname + "/public/images/arenal.jpg");

    return res.status(200).json(tank);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Update tank by Id
// @route   PUT /api/waterTanks/:id
// @access  Private
const updateTank = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, capacity } = req.body;

    let photos = []; // <--- photos should be defined as null in case the tanks's photo is not updated/changed

    if (req.files !== undefined)
      req.files.forEach((photo) => photos.push(photo));

    if (!name || !location || !capacity)
      return res.status(400).json({
        error: "Please enter all the fields (name, location, capacity)",
      });

    // If photos is not defined, then the same photo should be retained
    if (
      photos === undefined ||
      photos === null ||
      photos === "" ||
      photos.length === 0
    ) {
      const q = `UPDATE tanks SET name = '${name}', location = '${location}', capacity = '${capacity}' WHERE idtanks = ?`;
      const resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "tanks" table' });
    } else {
      // Update the tank
      // The previous photos will be retained, the new photos will be added to the existing tank's photos.
      const q = `UPDATE tanks SET name = '${name}', location = '${location}', capacity = '${capacity}' WHERE idtanks = ?`,
        resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "tanks" table' });

      // Add the new photos
      const q1 =
        "INSERT INTO `db_lalucha`.`uploaded_photos` (`photo`, `idtanks`) VALUES (?, ?)";
      photos.forEach(async (photo) => {
        const resultHeader = await pool.query(q1, [photo.filename, id]);
      });
    }

    const tank = await pool.query("SELECT * FROM tanks WHERE idtanks = ?", [
      id,
    ]);

    res.status(200).json({ message: "Tank updated successfully", tank });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Delete tank photo
// @route   DELETE /api/waterTanks/:id
// @access  Private
const deleteTankPhoto = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Id", id);
    const q = "DELETE FROM uploaded_photos WHERE idphoto = ?";
    const photo = await pool.query(
      "SELECT photo FROM uploaded_photos WHERE idphoto = ? ",
      [id]
    );
    const resultHeader = await pool.query(q, [id]);

    if (resultHeader.affectedRows > 0) {
      const oldPath = path.join(__dirname, "..", "uploads", photo[0].photo);

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
        error: "No se ha podido eliminar la foto del tanque de almacenamiento",
      });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

// @desc    Delete water tank by Id
// @route   DELETE /api/waterTanks/:id
// @access  Private
const deleteTank = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = "DELETE FROM tanks WHERE idtanks = ?";
    // Get old document
    const oldDocs = await pool.query(
      "SELECT photo FROM uploaded_photos WHERE idtanks = ?",
      [id]
    );

    const resultHeader = await pool.query(q, [id]);

    oldDocs.forEach((item) => {
      // Check if oldDoc exists in server and delete it
      if (item) {
        const oldPath = path.join(__dirname, "..", "uploads", item.photo); // ---> backend\uploads\[photo].<png|jpg|jpeg>

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
      return res
        .status(200)
        .json({ error: "No se ha podido eliminar el registro del formulario" });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

module.exports = {
  getTanks,
  addTank,
  getTank,
  updateTank,
  deleteTankPhoto,
  deleteTank,
};
