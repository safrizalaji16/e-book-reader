const jwt = require("jsonwebtoken");

module.exports = {
    createToken(payload) {
        return jwt.sign(payload, process.env.SECRET_KEY);
    },
    verifyToken(token) {
        return jwt.verify(token, process.env.SECRET_KEY);
    },
};