const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Role_User = sequelize.define('Role_User', {
    id: {
        type : DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'users',
        foreignkey: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences:{
      model : 'roles',
      foreignkey: 'id'
      }
    },
   end_at :{
     type : DataTypes.DATE,
   },
   createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
    
})

module.exports = Role_User;