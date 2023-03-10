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
      Task.belongsTo(models.Project, {foreignKey: 'project_id'})
      Task.hasMany(models.Task_Progress, {foreignKey: 'task_id'})
      Task.hasMany(models.Assignee_Feedback, {foreignKey: 'task_id'})
    }
  };
  Task.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id:{
      allowNull: false,
      type: DataTypes.INTEGER,
      refrences: {
        model: 'User',
        primaryKey: 'id'
      }
    },
    project_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      refrences: {
        model: 'Project',
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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'tasks',
    modelName: 'Task',
  });
  return Task;
};