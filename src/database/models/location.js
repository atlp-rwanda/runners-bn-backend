const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /** Class representing a User model . */
  class Location extends Model {
    /**
* @description this method to associate trip model to user model
* @param {Object} models
* @returns {object} returns associations
* @memberof User
*/
    static associate(models) {
      // define association here
      Location.belongsToMany(models.Trip, {
        through: 'location',
      });
    }
  }
  Location.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};
