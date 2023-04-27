const Controller = require("../controllers/book");
const multer = require("multer");
const { authentication } = require("../middlewares/authentication");
const router = require("express").Router();
const path = require('path');
const { authorizationOwner } = require("../middlewares/authorization");
const uploadFolder = path.join(__dirname, "../books");
const storage = multer.diskStorage({
    destination: uploadFolder,
    filename: (req, file, cb) => {
        let [filename, extension] = file.originalname.split('.');
        let nameFile = filename + "-" + Date.now() + "." + extension;
        cb(null, nameFile)
    }
})
const fileFilter = (req, file, cb) => {
    // Check if the uploaded file is a PDF
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        const err = new Error("Only PDF files are allowed to be uploaded");
        err.status = 400;
        cb(err);
    }
};
const upload = multer({ storage, fileFilter });

router
    .use(authentication)
    .get("/", Controller.getAllBooks)
    .post("/upload", upload.array("files"), Controller.uploadFiles)
    .get("/download/:id", authorizationOwner, Controller.downloadFile)
    .delete("/:id", authorizationOwner, Controller.deleteBook)

module.exports = router;