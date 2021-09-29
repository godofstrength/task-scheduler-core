const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Role = sequelize.define('Role', {
    id: {
        type : DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    permssions : {
        type: DataTypes.STRING(255),
    }
    
})
Role.associate = () => {
}
module.exports = Role;