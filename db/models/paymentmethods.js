'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentMethods = sequelize.define('PaymentMethods', {
    name: DataTypes.STRING
  }, {});
  PaymentMethods.associate = function(models) {
    // associations can be defined here
  };
  return PaymentMethods;
};