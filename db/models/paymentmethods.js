'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PaymentMethods.hasMany(models.Invoices, {as: 'Invoices'})
    }
  }
  PaymentMethods.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    is_crypto: DataTypes.BOOLEAN({default: false}),
    gateway: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    modelName: 'PaymentMethods',
    tableName: 'PaymentMethods'
  });
  return PaymentMethods;
};