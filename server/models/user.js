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
      // User.belongsToMany(models.Book, {
      //   through: models.Favourite,
      //   foreignKey: 'userId',
      //   otherKey: 'bookId'
      // })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      defaultValue: 'User',
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
        notNull: { args: true, msg: `Password is required` },
        notEmpty: { args: true, msg: `Password is required`},
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'User'
    },
    phoneNumber: DataTypes.STRING,
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: 'https://res.cloudinary.com/d3711111/image/upload/v1621069111/default-profile_p1j42o.png'
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
        user.isSubscribed = false;
      }
    }
  });
  return User;
};