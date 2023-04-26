const router = require("express").Router();
const userRouter = require("./user");
const bookRouter = require("./book");

router
    .use(userRouter)
    .use(bookRouter);

module.exports = router;