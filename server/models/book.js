'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Book.belongsToMany(models.User, {
      //   through: models.Favourite,
      //   foreignKey: 'bookId',
      //   otherKey: 'userId'
      // })
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    releaseDate: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 100000,
    },
    pages: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book'
  });
  return Book;
};