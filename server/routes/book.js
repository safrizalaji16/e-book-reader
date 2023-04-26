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
    .post("/upload_books", upload.array("files"), Controller.uploadFiles)
    .get('/download', async (req, res, next) => {
        const video = await UserToUploadMapping.find({});
        res.download(video[0].file.path); // video[0].file.path is the absolute path to the file
    })

module.exports = router;