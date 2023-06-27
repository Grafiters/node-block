'use strict';
module.exports = (sequelize, DataTypes) => {
  const SmartContractEvents = sequelize.define('SmartContractEvents', {
    contract_address: DataTypes.STRING
  }, {});
  SmartContractEvents.associate = function(models) {
    // associations can be defined here
  };
  return SmartContractEvents;
};