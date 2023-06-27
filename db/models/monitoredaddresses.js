'use strict';
module.exports = (sequelize, DataTypes) => {
  const MonitoredAddresses = sequelize.define('MonitoredAddresses', {
    address: DataTypes.STRING
  }, {});
  MonitoredAddresses.associate = function(models) {
    // associations can be defined here
  };
  return MonitoredAddresses;
};