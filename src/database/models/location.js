const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /** Class representing a location model . */
  class Location extends Model {
    /**
* @description this method defines location association
* @param {Object} models
* @returns {object} Location
* @memberof Location
*/
    static associate(models) {
      // define association here
      Location.belongsToMany(models.Trip, {
        through: 'location',
      });
      Location.hasMany(models.Accommodation, {
        foreignKey: 'locationId',
        onDelete: 'NO ACTION'
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
