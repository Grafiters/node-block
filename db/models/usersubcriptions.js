'use strict';
const { create } = require('qrcode');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSubscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserSubscriptions.belongsTo(models.User, {foreignKey: 'user_id'})
      UserSubscriptions.belongsTo(models.Packages, {foreignKey: 'package_id'})
      UserSubscriptions.belongsTo(models.Invoices, {foreignKey: 'invoice_id'})
    }
  }
  UserSubscriptions.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    user_id: DataTypes.BIGINT,
    package_id: DataTypes.BIGINT,
    invoice_id: DataTypes.BIGINT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    modelName: 'UserSubscriptions',
    tableName: 'User_Subscriptions'
  });
  return UserSubscriptions;
};