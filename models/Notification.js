'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Notification.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'users',
        foreignKey: 'id'
      }
    },
    title: {
      type: DataTypes.STRING
    },
    read: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    tableName: 'notification',
    modelName: 'Notification',
  });
  return Notification;
};