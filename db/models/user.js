'use strict';
const { create } = require('qrcode');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserSubscriptions, {as: 'UserSubcriptions'});
      User.hasMany(models.ApiKeys, {as: 'ApiKeys'});
      User.hasMany(models.MonitoredAddresses, {as: 'MonitoredAddresses'});
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID
    },
    email: DataTypes.STRING,
    password_digest: DataTypes.STRING,
    google_id: DataTypes.STRING,
    role: DataTypes.ENUM({
      values: ['Admin', 'User', 'Developer'],
      default: 'User'
    }),
    email_verification_token: DataTypes.STRING,
    email_verified_at: DataTypes.DATE({default: null}),
    otp_secret: DataTypes.STRING,
    otp_enabled: DataTypes.BOOLEAN({default: false}),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    modelName: 'User',
    tableName: 'Users'
  });
  return User;
};