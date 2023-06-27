'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotificationHistory = sequelize.define('NotificationHistory', {
    data: DataTypes.TEXT
  }, {});
  NotificationHistory.associate = function(models) {
    // associations can be defined here
  };
  return NotificationHistory;
};