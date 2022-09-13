const multer = require("multer");
const path = require("path");

const jsonPath = path.join("uploads", "informes"); // ----> ../uploads/

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, jsonPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (
    file.mimetype == "application/pdf" ||
    file.mimetype == "application/ppt" ||
    file.mimetype == "application/pptx" ||
    file.mimetype ==
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    const err = new Error("Only .pdf format allowed!");
    err.name = "ExtensionError";
    return cb(err);
  }
};

const uploadForInformes = multer({
  storage: fileStorageEngine,
  fileFilter: fileFilter,
});

module.exports = uploadForInformes.single("idoc");

/*  
Prueba con presentacion de Power Point
Descripcion para prueba de Power Point

*/
