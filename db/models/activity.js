'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activity.belongsTo(models.User, {foreignKey: 'user_id'})
    }
  }
  Activity.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    user_id: DataTypes.BIGINT,
    ip_address: DataTypes.STRING,
    country: DataTypes.STRING,
    user_agent: DataTypes.STRING,
    action: DataTypes.STRING,
    action_result: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    modelName: 'Activity',
    tableName: 'Activity'
  });
  return Activity;
};