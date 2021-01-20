/* eslint-disable require-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
