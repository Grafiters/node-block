'use strict';
module.exports = (sequelize, DataTypes) => {
  const Packages = sequelize.define('Packages', {
    name: DataTypes.STRING
  }, {});
  Packages.associate = function(models) {
    // associations can be defined here
  };
  return Packages;
};