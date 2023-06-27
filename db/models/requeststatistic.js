'use strict';
module.exports = (sequelize, DataTypes) => {
  const RequestStatistic = sequelize.define('RequestStatistic', {
    ip_address: DataTypes.STRING
  }, {});
  RequestStatistic.associate = function(models) {
    // associations can be defined here
  };
  return RequestStatistic;
};