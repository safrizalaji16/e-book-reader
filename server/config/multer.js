const multer = require("multer");
const path = require("path");
const uploadFolder = path.join(__dirname, "../books");

const storage = multer.diskStorage({
  destination: uploadFolder,
  filename: (req, file, cb) => {
    let [filename, extension] = file.originalname.split(".");
    let nameFile = filename + "-" + Date.now() + "." + extension;
    cb(null, nameFile);
  },
});

const fileFilter = (req, file, cb) => {
  // Check if the uploaded file is a PDF
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    const err = new Error("Only PDF files are allowed to be uploaded");
    err.status = 400;
    cb(err);
  }
};

module.exports = multer({ storage, fileFilter });
