const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

const Token = sequelize.define('Token', {
    id: {
        type : DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type : DataTypes.INTEGER(11),
        allowNull: false,   
        refrences: {
          model: 'users',
          foreignKey: 'user_id'
        }   
    }, 
    token: {
        type : DataTypes.STRING(200),
        allowNull: false,
    }
})
Token.associate = () => {
    Token.belongsTo(User, {foreignKey: 'user_id'});
}

module.exports = Token;