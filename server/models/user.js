'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Book, {
        through: models.Favourite,
        foreignKey: 'userId',
        otherKey: 'bookId'
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Username is required' },
        notEmpty: { args: true, msg: 'Username is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Email is already Exists' },
      validate: {
        isEmail: { args : true, msg: 'Invalid Email format'},
        notNull: {args : true, msg: 'Email is required'},
        notEmpty: {args : true, msg: 'Email is required'},
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: `Password cannot be empty` },
        notEmpty: { args: true, msg: `Password cannot be empty`},
        passwordLength() {
          if (this.password.length < 8) {
            throw new Error('Password must be at least 8 characters');
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'User'
    },
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      }
    }
  });
  return User;
};