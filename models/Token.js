'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Token.belongsTo(models.User, {
        onDelete: 'cascade',
        foreignKey: 'user_id'
      })
    }
  };
  Token.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
   user_id: {
       type: DataTypes.INTEGER
   },
   token: {
       type: DataTypes.STRING
   }
  }, {
    sequelize,
    tableName:'tokens',
    modelName: 'Token',
  });
  return Token;
};