'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    ip_address: DataTypes.STRING
  }, {});
  Activity.associate = function(models) {
    // associations can be defined here
  };
  return Activity;
};