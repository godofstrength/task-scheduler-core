'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Role_User.init({
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
    end_at: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'role_users',
    modelName: 'Role_User',
  });
  return Role_User;
};