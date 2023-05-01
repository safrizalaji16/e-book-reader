const Controller = require("../controllers/book");
const { authentication } = require("../middlewares/authentication");
const router = require("express").Router();
const { authorizationOwner } = require("../middlewares/authorization");
const upload = require("../config/multer");

router
  .use(authentication)
  .get("/", Controller.getAllBooks)
  .post("/upload", upload.single("files"), Controller.uploadFiles)
  .get("/download/:id", authorizationOwner, Controller.downloadFile)
  .use("/:id", authorizationOwner)
  .get("/:id", Controller.getOneBook)
  .put("/:id", Controller.updateBook)
  .delete("/:id", Controller.deleteBook);

module.exports = router;
