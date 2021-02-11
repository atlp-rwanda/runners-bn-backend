import emitter from '../../helpers/EventEmitters/eventEmitter';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /** Class representing a User model . */
  class Trip extends Model {
    /**
* @description this method to associate trip model to user model
* @param {Object} models
* @returns {object} returns associations
* @memberof User
*/
    static associate(models) {
      // define association here
      Trip.belongsTo(models.User, {
        as: 'requester',
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
      Trip.belongsTo(models.User, {
        as: 'manager',
        foreignKey: 'managerId'
      });
      Trip.belongsTo(models.Location, {
        as: 'departure',
        foreignKey: 'from'
      });
      Trip.belongsTo(models.Location, {
        as: 'destination',
        foreignKey: 'to'
      });
    }
  }
  Trip.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    from: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    travelDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returnDate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    }
  }, {
    sequelize,
    modelName: 'Trip',
  });

  Trip.afterCreate(({ dataValues }) => emitter.emit('request created', dataValues));
  Trip.afterUpdate(({ dataValues, _changed }) => emitter.emit('request updated', { dataValues, _changed }));

  return Trip;
};
