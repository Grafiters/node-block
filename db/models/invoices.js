'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoices = sequelize.define('Invoices', {
    total_amount: DataTypes.DECIMAL
  }, {});
  Invoices.associate = function(models) {
    // associations can be defined here
  };
  return Invoices;
};