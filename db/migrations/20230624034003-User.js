'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('users',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password_digest: {
        allowNull: true,
        type: Sequelize.STRING
      },
      google_id:{
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM({
          values: ['Admin', 'User', 'Developer']
        }),
        defaultValue: "User"
      },
      email_verification_token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email_verified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      otp_secret: {
        allowNull: true,
        type: Sequelize.STRING
      },
      otp_enabled: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP")
      },
    })

    await queryInterface.addIndex('users', ['google_id'])
    await queryInterface.addIndex('users', ['role'])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeIndex('users', ['google_id'])
    await queryInterface.removeIndex('users', ['role'])
    await queryInterface.dropTable('users');
  }
};
