'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blockchain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blockchain.hasMany(models.Node, {as: 'Node'})
    }
  }
  Blockchain.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    blockchain_name: DataTypes.STRING,
    height: DataTypes.INTEGER,
    network: DataTypes.STRING,
    version: DataTypes.STRING,
    location: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    modelName: 'Blockchain',
    tableName: 'Blockchain'
  });
  return Blockchain;
};