const multer = require("multer");
const path = require("path");

const jsonPath = path.join(__dirname, "../uploads"); // ----> ../uploads/

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, jsonPath);
  },
  filename: (req, file, cb) => {
    cb(null, "img" + Date.now() + "." + file.originalname.split(".")[1]);
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

const uploadForProjects = multer({
  storage: fileStorageEngine,
  fileFilter: fileFilter,
});

module.exports = uploadForProjects.array("images", 10);
