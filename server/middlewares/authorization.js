const { Book } = require("../models");

module.exports = {
  async authorizationOwner(req, res, next) {
    try {
      const { id } = req.params;
      const UserId = req.User.id;
      const book = await Book.findByPk(id);

      if (!book) {
        throw {
          name: "Book Not Found",
        };
      }

      if (book.UserId !== UserId) {
        throw {
          name: "Forbidden",
        };
      }

      next();
    } catch (err) {
      next(err);
    }
  },
};