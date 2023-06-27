'use strict';
module.exports = (sequelize, DataTypes) => {
  const ApiKeys = sequelize.define('ApuiKeys', {
    label: DataTypes.STRING
  }, {});
  ApiKeys.associate = function(models) {
    // associations can be defined here
  };
  return ApiKeys;
};