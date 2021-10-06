'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.hasMany(models.Task, {foreignKey: 'project_id'})
    }
  };
  Project.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'departments',
        foreignKey: 'id'
      }
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    client: {
      type: DataTypes.STRING,
    },
    budget: {
      type: DataTypes.DECIMAL(15,2)
    },
    percentage: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00
    },
    created_by:{
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    tableName: 'projects',
    modelName: 'Project',
  });
  return Project;
};