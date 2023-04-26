const Controller = require("../controllers/user");

const router = require("express").Router();

router.post("/login", Controller.login);

module.exports = router;