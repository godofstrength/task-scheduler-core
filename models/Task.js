'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Task.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id:{
      allowNull: false,
      type: DataTypes.INTEGER,
      refrences: {
        model: 'users',
        primaryKey: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    assignedTo: {
      type: DataTypes.STRING(255)
    },
    deadline: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};