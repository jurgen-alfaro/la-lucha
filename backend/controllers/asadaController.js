const asyncHandler = require("express-async-handler");
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

// @desc    Patch asada
// @route   PATCH /api/asada/:id
// @access  Private
const patchAsada = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: "Please enter any field to update asada",
    });
  const parameters = [...Object.values(req.body), Number(id)];
  const q = `UPDATE asada SET ${Object.keys(req.body)
    .map((key) => `${key} = ?`)
    .join(", ")} WHERE idasada = ?`;
  try {
    const resultHeaders = await pool.query(q, parameters);
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

// @desc    Create contacto
// @route   POST /api/asada/:id/contacto
// @access  Private
const createAsadaContacto = asyncHandler(async (req, res) => {
  const { tipo, info, texto, idasada } = req.body;

  if (!tipo || !info || !texto || !idasada)
    return res.status(400).json({
      error: "Please enter all fields (tipo, info, texto, idasada)",
    });

  const q =
    "INSERT INTO `" +
    process.env.MYSQL_DATABASE +
    "`.`contactos` (`tipo`, `info`, `texto`, `idasada`) VALUES (?, ?, ?, ?);";
  const resultHeaders = await pool.query(q, [tipo, info, texto, idasada]);

  const contacto = await pool.query(
    "SELECT * FROM contactos WHERE idcontacto = ?",
    [resultHeaders.insertId]
  );

  return res.status(201).json({
    message: "Asada contacto created",
    contacto: contacto[0],
  });
});

// @desc    Get Asada contactos
// @route   GET /api/asada/:id/contacto
// @access  Public
const getAsadaContactos = asyncHandler(async (req, res) => {
  try {
    const id = 1;
    const q = "SELECT * FROM contactos WHERE idasada = ?";
    const contactos = await pool.query(q, [id]);

    if (!contactos)
      return res
        .status(400)
        .json({ message: "Failed to fetch information from 'asada' table" });

    return res.status(200).json(contactos);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Get Asada contacto
// @route   GET /api/asada/:id/contacto/:idc
// @access  Public
const getAsadaContacto = asyncHandler(async (req, res) => {
  const { idcontacto } = req.params;

  try {
    const q1 = "SELECT * FROM contactos WHERE idcontacto = ?";
    const c = await pool.query(q1, idcontacto);

    return res.status(200).json({ contacto: c[0] });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Patch contacto
// @route   PATCH /api/asada/:id
// @access  Private
const patchAsadaContacto = asyncHandler(async (req, res) => {
  const { idcontacto } = req.params;
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: "Please enter any field to update asada",
    });
  const parameters = [...Object.values(req.body), Number(idcontacto)];
  const q = `UPDATE contactos SET ${Object.keys(req.body)
    .map((key) => `${key} = ?`)
    .join(", ")} WHERE idcontacto = ?`;
  try {
    const resultHeaders = await pool.query(q, parameters);
    if (resultHeaders.affectedRows <= 0)
      return res
        .status(400)
        .json({ error: 'No fields were updated in "contactos" table' });

    res.status(200).json({ message: "Contacto updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});
// @desc    Patch contacto
// @route   PATCH /api/asada/:id
// @access  Private
const deleteAsadaContacto = asyncHandler(async (req, res) => {
  try {
    const { idcontacto } = req.params;
    const q = "DELETE FROM contactos WHERE idcontacto = ?";
    const resultHeader = await pool.query(q, [idcontacto]);

    if (resultHeader.affectedRows > 0)
      return res.status(200).json({ resultHeader: resultHeader });
    else
      return res.status(200).json({
        error: "No se ha podido eliminar el registro del contacto de la Asada",
      });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

module.exports = {
  getAsada,
  updateAsada,
  createAsadaContacto,
  getAsadaContactos,
  getAsadaContacto,
  patchAsadaContacto,
  patchAsada,
  deleteAsadaContacto,
};
