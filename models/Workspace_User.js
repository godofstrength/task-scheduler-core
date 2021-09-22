'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workspace_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Workspace_User.init({
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
    workspace_id: {
      type:DataTypes.INTEGER,
      refrences: {
        model: 'workspace',
        foreignKey: 'id'
      }
    },
    role: {
      type: Datatypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Workspace_User',
  });
  return Workspace_User;
};