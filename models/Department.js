const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Department_User = require('./Department_User');
const Project = require('./Project');

const Department = sequelize.define('Department', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER(11)
  },
  created_by: {
    allowNull: false,
    type: DataTypes.INTEGER,
    refrences: {
      model: User,
      foreignKey: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  code:{
    type: DataTypes.STRING(255)
  }
})

Department.associate = ()=>{
  Department.BelongsToMany(User, {through: Department_User});
  Department.hasMany(Project)
}

module.exports = Department;