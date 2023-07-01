'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestStatistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RequestStatistic.belongsTo(models.ApiKeys, {foreignKey: 'api_key_id'})
    }
  }
  RequestStatistic.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    api_key_id: DataTypes.BIGINT,
    ip_address: DataTypes.STRING,
    user_agent: DataTypes.STRING,
    action: DataTypes.STRING,
    action_result: DataTypes.STRING,
    endpoint: DataTypes.STRING,
    created_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    modelName: 'RequestStatistic',
    tableName: 'RequestStatistic'
  });
  return RequestStatistic;
};