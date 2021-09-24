const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Task = sequelize.define('Task', {
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
  project_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    refrences: {
      model: 'projects',
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
  start_date: {
    type: DataTypes.DATE
  },
  end_date: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.INTEGER
  },
  priority:{
    type: DataTypes.INTEGER
  }
})