const { Book } = require("../models");
const cloudinary = require("../config/claudinary");
const fs = require("fs");

class Controller {
  static async uploadFiles(req, res, next) {
    let publicId = "";
    try {
      const data = { ...req.file, ...req.body, UserId: req.User.id };
      const result = await cloudinary.uploader.upload(data.path, {
        access_mode: "public",
        resource_type: "raw",
        format: "pdf",
      });
      console.log(result, "<<<");
      publicId = result.public_id;

      const url = cloudinary.url(publicId, {
        resource_type: "raw",
        secure: true,
      });

      data.url = url;
      data.publicId = publicId;

      await Book.create(data);
      res.status(200).json({ msg: "Successfully uploaded books" });
    } catch (err) {
      await cloudinary.uploader.destroy(publicId, function (err) {
        if (err) {
          next(err);
        }
      });
      fs.unlink(req.file.path, (err) => {
        if (err) {
          next(err);
        }
      });
      next(err);
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

      res.status(200).download(book.path, book.filename, {
        headers: {
          "Content-Type": "application/pdf",
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAllBooks(req, res, next) {
    try {
      const books = await Book.findAll({
        where: { UserId: req.User.id },
        order: [["id", "ASC"]],
      });

      res.status(200).json(books);
    } catch (err) {
      next(err);
    }
  }

  static async getOneBook(req, res, next) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id);

      if (!book) {
        throw {
          name: "Book Not Found",
        };
      }

      res.status(200).json(book);
    } catch (err) {
      next(err);
    }
  }

  static async updateBook(req, res, next) {
    try {
      const { id } = req.params;
      const { title, cover, author } = req.body;

      const book = await Book.findByPk(id);

      if (!book) {
        throw {
          name: "Book Not Found",
        };
      }

      await Book.update({ title, cover, author }, { where: { id } });

      res.status(201).json({
        msg: "Success to update Book",
      });
    } catch (err) {
      next(err);
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
          next(err);
        }
      });

      await cloudinary.uploader.destroy(book.publicId, function (err) {
        if (err) {
          next(err);
        }
      });

      res.status(200).json({
        msg: "Book success to delete",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
