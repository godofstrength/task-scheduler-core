const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Task = require("./Task");

const Task_Progress = sequelize.define('Task_Progress', {
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
  }
})

Task_Progress.associate =() => {
 Task_Progress.belongsTo(Task)
}

module.exports = Task_Progress