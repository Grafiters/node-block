'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSubcriptions = sequelize.define('UserSubcriptions', {
    total_amount: DataTypes.DECIMAL
  }, {});
  UserSubcriptions.associate = function(models) {
    // associations can be defined here
  };
  return UserSubcriptions;
};