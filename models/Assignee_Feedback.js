'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assignee_Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assignee_Feedback.belongsTo(models.Task)
   
    }
  };
  Assignee_Feedback.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'tasks',
        foreignKey: 'id'
      }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Assignee_Feedback',
  });
  return Assignee_Feedback;
};