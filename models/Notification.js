const { DataTypes } = require('sequelize/types');
const sequelize = require('../config/connection');
const User = require('./Role');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }

})

Notification.associate = () =>{
   Notification.belongsTo(User)
}

module.exports = Notification