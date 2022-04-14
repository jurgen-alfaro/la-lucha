const multer = require("multer");
const path = require("path");

const jsonPath = path.join("backend", "uploads", "tanks"); // ----> ../uploads/

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, jsonPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    const err = new Error("Only .png, .jpg and .jpeg format allowed!");
    err.name = "ExtensionError";
    return cb(err);
  }
};

const uploadForTanks = multer({
  storage: fileStorageEngine,
  fileFilter: fileFilter,
});

module.exports = uploadForTanks.array("images", 10);