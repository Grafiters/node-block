'use strict';
module.exports = (sequelize, DataTypes) => {
  const Node = sequelize.define('Node', {
    endpoint: DataTypes.STRING
  }, {});
  Node.associate = function(models) {
    // associations can be defined here
  };
  return Node;
};