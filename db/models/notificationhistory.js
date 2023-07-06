'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotificationHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NotificationHistory.belongsTo(models.User, {foreignKey: 'user_id'})
      NotificationHistory.belongsTo(models.MonitoredAddresses, {foreignKey: 'address_id'})
      NotificationHistory.belongsTo(models.SmartContractEvents, {foreignKey: 'event_id'})
    }
  }
  NotificationHistory.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    user_id: DataTypes.BIGINT,
    event_id: DataTypes.BIGINT,
    address_id: DataTypes.BIGINT,
    notification_type: DataTypes.ENUM({
      values: ['Email', 'WebSocket', 'Other']
    }),
    notification_time: DataTypes.DATE,
    notification_status: DataTypes.ENUM({
      values: ['Sent', 'Delivered', 'Failed']
    }),
    data: DataTypes.TEXT,
    created_at: DataTypes.DATE,
  }, {
    updated_at: false,
    updatedAt: false,
    sequelize,
    underscored: true,
    modelName: 'NotificationHistory',
    tableName: 'NotificationHistory'
  });
  return NotificationHistory;
};