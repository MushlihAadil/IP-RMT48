'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Character.init({
    fullName: DataTypes.STRING,
    nickname: DataTypes.STRING,
    hogwartsHouse: DataTypes.STRING,
    actor: DataTypes.STRING,
    children: {
      type: DataTypes.STRING,
      defaultValue: ['Have no children'],
    },
    imageUrl: DataTypes.STRING,
    birthdate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};