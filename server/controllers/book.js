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

    static async downloadFile(req, res, next) {
        try {
            const { id } = req.params;
            const book = await Book.findByPk(id);

            // res.json(book)
            res.download(book.path); // video[0].file.path is the absolute path to the file
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller;