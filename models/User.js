'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Token, {
        onDelete: 'cascade',
        foreignKey: 'user_id'
      })
      User.belongsToMany(models.Department,{
          through: models.Department_User,
          foreignKey: 'user_id'
        })
      User.hasMany(models.Notification, {foreignKey: 'user_id'})
      User.hasMany(models.Assignee_Feedback, {foreignKey: 'user_id'})

      User.belongsToMany(models.Role,{
        through: models.Role_User,
        foreignKey: 'user_id'
      })
  }};
  
  User.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      allowNull: false,
      type: DataTypes.STRING(45)
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING(45)
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(30)
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }

  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};