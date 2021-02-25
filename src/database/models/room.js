const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /** class representing  room model */
  class Room extends Model {
  /**
* @description this method defines location association
* @param {Object} models
* @returns {object} room
* @memberof Room
*/
    static associate(models) {
    // define association here
      Room.belongsTo(models.Accommodation, {
        foreignKey: 'accommodationId',
        as: 'accommodation',
        onDelete: 'CASCADE'
      });
    }
  }

  Room.init({
    accommodationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bedType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomNumber: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    photo: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
  }, {
    sequelize,
    paranoid: false,
    modelName: 'Room',
  });
  return Room;
};
