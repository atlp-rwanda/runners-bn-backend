/* eslint-disable valid-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /** Class representing a User model . */
  class User extends Model {
  /**
* @description this method defines user association
* @param {Object} models
* @returns {object} User
* @memberof User
*/
    static associate(models) {
      // define association here
      User.hasMany(models.Notification, {
        foreignKey: 'receiverId',
        as: 'notifications',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      User.hasMany(models.Trip, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        hooks: true,
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    managerId: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    role: {
      type: DataTypes.ENUM('superAdmin', 'manager', 'requester', 'tripAdmin'),
      defaultValue: 'requester',
    },
    emailAllowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
