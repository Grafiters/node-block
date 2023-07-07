'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoices.belongsTo(models.Packages, {foreignKey: 'package_id'})
      Invoices.belongsTo(models.PaymentMethods, {foreignKey: 'payment_method_id'})
      Invoices.hasOne(models.UserSubscriptions, {as: 'UserSubscriptions'})
    }
  }
  Invoices.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    package_id: DataTypes.BIGINT,
    payment_method_id: DataTypes.BIGINT,
    payment_due_date: DataTypes.DATE,
    payment_date: DataTypes.DATE,
    total_amount: DataTypes.DECIMAL(10,2),
    status: DataTypes.ENUM({
      values: ['unpaid', 'paid', 'overdue'],
      default: 'unpaid'
    }),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    modelName: 'Invoices',
    tableName: 'Invoices'
  });
  return Invoices;
};