"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favourite.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Favourite.belongsTo(models.Book, {
        foreignKey: "bookId",
      });
    }
  }
  Favourite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "UserId is required" },
          notEmpty: { args: true, msg: "UserId is required" },
        },
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "BookId is required" },
          notEmpty: { args: true, msg: "BookId is required" },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Favourite",
    }
  );
  return Favourite;
};
