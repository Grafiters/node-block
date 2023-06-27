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

    await queryInterface.createTable('Users',{
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
        type: Sequelize.ENUM('Admin', 'User', 'Developer')
      },
      email_verification_token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email_verified_at: {
        allowNull: true,
        type: "TIMESTAMP",
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
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updated_at: {
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP")
      },
    })

    await queryInterface.addIndex('Users', ['google_id'])
    await queryInterface.addIndex('Users', ['role'])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('Users');
     */

    await queryInterface.removeIndex('Users', ['google_id'])
    await queryInterface.removeIndex('Users', ['role'])
    await queryInterface.dropTable('Users');
  }
};
