'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blockchain = sequelize.define('Blockchain', {
    blockchain_name: DataTypes.STRING
  }, {});
  Blockchain.associate = function(models) {
    // associations can be defined here
  };
  return Blockchain;
};