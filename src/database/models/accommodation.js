/* eslint-disable require-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Accommodation extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      Accommodation.belongsTo(models.Location, {
        foreignKey: 'locationId',
        as: 'city',
        onDelete: 'NO ACTION'
      });
      Accommodation.hasMany(models.Room, {
        foreignKey: 'accommodationId',
        as: 'accommodation',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Accommodation.init({
    accommodationName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    accommodationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    numberOfRooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    paranoid: false,
    modelName: 'Accommodation',
  });
  return Accommodation;
};
