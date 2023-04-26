// const { Order } = require("../models");

module.exports = {
  async authorizationOwner(req, res, next) {
    try {
      const { id } = req.params;
      const UserId = req.User.id;
    //   const order = await Order.findByPk(id);

    //   if (order.UserId !== UserId) {
    //     throw {
    //       name: "Forbidden",
    //     };
    //   }

      next();
    } catch (err) {
      next(err);
    }
  },
};