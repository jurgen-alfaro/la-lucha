const multer = require("multer");
const path = require("path");

const jsonPath = path.join("backend", "uploads", "reglamentos"); // ----> ../uploads/

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, jsonPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
    const err = new Error("Only .pdf format allowed!");
    err.name = "ExtensionError";
    return cb(err);
  }
};

const uploadForReglamentos = multer({
  storage: fileStorageEngine,
  fileFilter: fileFilter,
});

module.exports = uploadForReglamentos.single("rdoc");
