const Controller = require("../controllers/book");
const multer = require("multer");
const { authentication } = require("../middlewares/authentication");
const router = require("express").Router();
const path = require('path');
const uploadFolder = path.join(__dirname, "books");
const storage = multer.diskStorage({
    destination: uploadFolder,
    filename: (req, file, cb) => {
        let [filename, extension] = file.originalname.split('.');
        let nameFile = filename + "-" + Date.now() + "." + extension;
        cb(null, nameFile)
    }
})
const upload = multer({ storage });

router
    .use(authentication)
    .post("/upload", upload.array("files"), Controller.uploadFiles)
    .get("/download/:id", Controller.downloadFile)

module.exports = router;