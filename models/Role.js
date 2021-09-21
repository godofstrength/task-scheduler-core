const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('Role', {
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
User.associate = () => {
}
module.exports = User;