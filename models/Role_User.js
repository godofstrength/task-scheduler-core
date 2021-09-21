const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('Role_User', {
    id: {
        type : DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      refrences: {
        model: 'users',
        foreignkey: 'id'
      }
    },
    role_id: {
      type: Sequelize.INTEGER,
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
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
    
})
User.associate = () => {
}
module.exports = User;