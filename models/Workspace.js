'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Workspace.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    logo:{
      type: DataTypes.STRING(255)
    },
    workspace_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model : 'workspace',
        foreignKey: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Workspace',
  });
  return Workspace;
};