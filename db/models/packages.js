'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Packages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Packages.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    request_per_second_limit: DataTypes.INTEGER,
    request_per_day_limit: DataTypes.INTEGER,
    request_per_month_limit: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2),
    is_trial: DataTypes.BOOLEAN({default: false}),
    trial_duration: DataTypes.INTEGER,
    trial_request_limit: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    modelName: 'Packages',
    tableName: 'Packages'
  });
  return Packages;
};