if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const router = require("./routes");
const { errHandler } = require("./middlewares/errHandler");

app
    .use(cors())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(router)
    .use(errHandler)
    .listen(port, () => {
        console.log(`Listening on port ${port}`);
    });