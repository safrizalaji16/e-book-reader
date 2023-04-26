const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = {
  async authentication(req, res, next) {
    try {
      const decoded = verifyToken(req.headers.access_token);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        throw {
          name: "Unauthorized",
        };
      }

      req.User = {
        id: user.id,
        email: user.email,
      };

      next();
    } catch (err) {
      next(err);
    }
  },
};