import emitter from '../../helpers/EventEmitters/eventEmitter';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /** class representing  comment model */
  class Comment extends Model {
    /**
* @description this method defines location association
* @param {Object} models
* @returns {object} comment
* @memberof Comment
*/
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Trip, {
        as: 'trip',
        foreignKey: 'tripId'
      });
      Comment.belongsTo(models.User, {
        as: 'commentetor',
        foreignKey: 'userId'
      });
    }
  }
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  Comment.afterCreate(({ dataValues }) => emitter.emit('comment added', dataValues));
  return Comment;
};
