'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Node extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Node.belongsTo(models.Blockchain, {foreignKey: 'blockchain_id'})
    }
  }
  Node.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    blockchain_id: DataTypes.BIGINT,
    api_interface: DataTypes.ENUM({
      values: ['JSON-RPC', 'WS', 'GRAPHQL','Advanced API']
    }),
    endpoint: DataTypes.STRING,
    documentation_link: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    modelName: 'Node',
    tableName: 'Node'
  });
  return Node;
};