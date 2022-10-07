const express = require("express");
const router = express.Router();
const {
  getAsada,
  updateAsada,
  patchAsada,
  createAsadaContacto,
  getAsadaContactos,
  getAsadaContacto,
  patchAsadaContacto,
  deleteAsadaContacto,
} = require("../controllers/asadaController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getAsada);
router.route("/:id").put(protect, updateAsada).patch(protect, patchAsada);
router
  .route("/:id/contactos")
  .post(protect, createAsadaContacto)
  .get(getAsadaContactos);
router
  .route("/:id/contactos/:idcontacto")
  .get(getAsadaContacto)
  .patch(protect, patchAsadaContacto)
  .delete(protect, deleteAsadaContacto);

module.exports = router;
