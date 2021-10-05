'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Department.belongsToMany(models.User, {through: models.Department_User, foreignKey: 'department_id'})
    }
  };
  Department.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'departments',
    modelName: 'Department',
  });
  return Department;
};