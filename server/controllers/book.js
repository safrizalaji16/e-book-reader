const { Book } = require("../models");
const fs = require('fs')

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

            if (!book) {
                throw {
                    name: "Book Not Found",
                };
            }

            res.status(200).download(book.path);
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async getAllBooks(req, res, next) {
        try {
            const books = await Book.findAll({ where: { UserId: req.User.id } });

            res.status(200).json(books);
        } catch (err) {
            next(err)
        }
    }

    static async deleteBook(req, res, next) {
        try {
            const { id } = req.params;
            const book = await Book.findByPk(id);

            if (!book) {
                throw {
                    name: "Book Not Found",
                };
            }

            await Book.destroy({
                where: { id },
            });

            fs.unlink(book.path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })

            res.status(200).json({
                msg: "Book success to delete",
            });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller;