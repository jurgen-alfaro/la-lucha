const multer = require("multer");
const path = require("path");

const jsonPath = path.join(
  __dirname,
  "..",
  "resources",
  "static",
  "assets",
  "uploads"
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

// const storage = multer.memoryStorage(); --> This gives buffer

const upload = multer({ storage: fileStorageEngine });

module.exports = upload.single("fdoc");
