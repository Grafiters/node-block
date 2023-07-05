'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApiKeys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ApiKeys.hasMany(models.RequestStatistic, {as: 'RequestStatistic'})
      ApiKeys.belongsTo(models.User, {foreignKey: 'user_id'})
    }
  }
  ApiKeys.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    user_id: DataTypes.BIGINT,
    label: DataTypes.STRING,
    api_key: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    modelName: 'ApiKeys',
    tableName: 'Api_Keys'
  });
  return ApiKeys;
};