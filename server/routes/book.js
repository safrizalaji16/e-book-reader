const Controller = require("../controllers/book");
const multer = require("multer");
const { authentication } = require("../middlewares/authentication");
const router = require("express").Router();
const path = require('path');
const { authorizationOwner } = require("../middlewares/authorization");
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
    .get("/", Controller.getAllBooks)
    .post("/upload", upload.array("files"), Controller.uploadFiles)
    .get("/download/:id", authorizationOwner, Controller.downloadFile)

module.exports = router;