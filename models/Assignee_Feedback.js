const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Task = require("./Task");

const Assignee_Feedback = sequelize.define('Assignee_Feedback', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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

Assignee_Feedback.associate = () => {
    Assignee_Feedback.belongsTo(Task)
}

module.exports = Assignee_Feedback;