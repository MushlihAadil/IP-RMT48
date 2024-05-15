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
        isEmail: { args : true, message: 'Invalid Email format'},
        notEmpty: {args : true, message: 'Email is required'},
        notNull: {args : true, message: 'Email is required'},
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Password cannot be empty` },
        notNull: { msg: `Password cannot be empty`},
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