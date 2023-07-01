'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonitoredAddresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MonitoredAddresses.belongsTo(models.User, {foreignKey: 'user_id'})
    }
  }
  MonitoredAddresses.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    user_id: DataTypes.BIGINT,
    address: DataTypes.STRING,
    notification_method: DataTypes.STRING,
    created_at: DataTypes.DATE,
    created_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    modelName: 'MonitoredAddresses',
    tableName: 'MonitoredAddresses'
  });
  return MonitoredAddresses;
};