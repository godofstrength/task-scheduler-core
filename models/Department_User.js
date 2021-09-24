const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Department = require('./Department')

const Department_User = sequelize.define('Department_User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  user_id: {
    type:DataTypes.INTEGER,
    refrences: {
      model: 'users',
      foreignKey: 'id'
    }
  },
  department_id: {
    type:DataTypes.INTEGER,
    allowNull: false,
    refrences: {
      model: 'Department',
      foreignKey: 'id'
    }
  },
  role: {
    type: DataTypes.INTEGER
  }
  
})



module.exports = Department_User;