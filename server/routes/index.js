const router = require("express").Router();
const userRouter = require("./user");
const bookRouter = require("./book");

router
    .use(userRouter)
    .use("/books", bookRouter);

module.exports = router;