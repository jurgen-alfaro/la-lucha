const multer = require("multer");
const path = require("path");

const jsonPath = path.join(
  __dirname,
  "..",
  "resources",
  "static",
  "assets",
  "uploads",
  "cv"
); // ----> ../resources/static/assets/uploads/

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, jsonPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.trim().replace(".pdf", "") +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
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

const uploadForJobs = multer({
  storage: fileStorageEngine,
  fileFilter: fileFilter,
});

module.exports = uploadForJobs.single("curriculum");
