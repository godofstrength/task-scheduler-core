const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Role = require('./Role');
const Department = require('./Department');
const Workspace_User = require('./Department_User')

const User = sequelize.define('User', {
    id: {
        type : DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstname:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING(255),
        allowNull: false
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
  User.belongsToMany(Department, {through: Department_User})
}
module.exports = User;