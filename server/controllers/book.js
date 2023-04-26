const { Book } = require("../models");

class Controller {
    static async uploadFiles(req, res, next) {
        try {
            let data = req.files.map(e => {
                e.UserId = req.User.id
                return e
            })
            await Book.bulkCreate(data)
            res.status(200).json({ msg: "Successfully uploaded books" });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller;