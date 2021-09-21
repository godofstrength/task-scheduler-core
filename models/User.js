const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Role = require('./Role')

const User = sequelize.define('User', {
    id: {
        type : DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique: true
    },
    password : {
        type: DataTypes.STRING(255),
        allowNull: false
    }
    
})
User.associate = () => {
  User.hasMany(Role, {through: 'user_id'})
}
module.exports = User;