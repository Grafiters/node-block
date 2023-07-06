'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SmartContractEvents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SmartContractEvents.belongsTo(models.User, {foreignKey: 'user_id'})
      SmartContractEvents.hasMany(models.NotificationHistory, {as: 'NotificationHistory'})
    }
  }
  SmartContractEvents.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    user_id: DataTypes.BIGINT,
    contract_address: DataTypes.STRING,
    event_name: DataTypes.STRING,
    notification_method: DataTypes.ENUM({
      values: ['Email', 'WebSocket', 'Other']
    }),
    created_at: DataTypes.DATE,
  }, {
    updated_at: false,
    updatedAt: false,
    sequelize,
    underscored: true,
    modelName: 'SmartContractEvents',
    tableName: 'SmartContractEvents'
  });
  return SmartContractEvents;
};