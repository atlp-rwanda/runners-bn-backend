/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // define association here
      Notification.belongsTo(models.User, {
        foreignKey: 'receiverId',
        as: 'receiver',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Notification.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'creator',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Notification.init({
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(10485760),
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Notification',
  });

  return Notification;
};
