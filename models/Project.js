const { DataTypes } = require("sequelize/types");
const sequelize = require('../config/connection');
const Task = require('./Task')

const Project = sequelize.define('Project', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
  created_by:{
    type: DataTypes.INTEGER
  }
})

Project.associate = () =>{
  Project.hasMany(Task)
}

module.exports = Project;