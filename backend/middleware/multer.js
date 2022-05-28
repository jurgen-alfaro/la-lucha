const multer = require("multer");
const path = require("path");

const jsonPath = path.join("backend", "uploads", "forms");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, jsonPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// const storage = multer.memoryStorage(); --> This gives buffer

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

const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter });

module.exports = upload.single("fdoc");
