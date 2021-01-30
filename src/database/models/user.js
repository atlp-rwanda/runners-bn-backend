const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /** Class representing a User model . */
  class User extends Model {
  /**
* @description this method defines user model
* @returns {object} User
* @memberof User
*/
    static associate() {
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
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
