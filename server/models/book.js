"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      fieldname: DataTypes.STRING,
      originalname: DataTypes.STRING,
      destination: DataTypes.STRING,
      filename: DataTypes.STRING,
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Path is required",
          },
          notEmpty: {
            msg: "Path is required",
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Already upload this book",
        },
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Author is required",
          },
          notEmpty: {
            msg: "Author is required",
          },
        },
      },
      cover: DataTypes.STRING,
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Url is required",
          },
          notEmpty: {
            msg: "Url is required",
          },
        },
      },
      publicId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Public id is required",
          },
          notEmpty: {
            msg: "Public id is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User id is required",
          },
          notEmpty: {
            msg: "User id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
