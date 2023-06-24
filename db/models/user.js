'use strict';
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
    }
  }
  User.init({
    email: DataTypes.STRING,
    password_digest: DataTypes.STRING,
    google_id: DataTypes.STRING,
    role: DataTypes.ENUM({
      values: ['Admin', 'User', 'Developer'],
      default: 'User'
    }),
    email_verification_token: DataTypes.STRING,
    email_verified: DataTypes.BOOLEAN({default: false}),
    otp_secret: DataTypes.STRING,
    otp_enabled: DataTypes.BOOLEAN({default: false}),
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};