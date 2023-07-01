'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id:{
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      package_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Packages',
          key: 'id'
        }
      },
      invoice_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Invoices',
          key: 'id'
        }
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
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
    .then(() => queryInterface.addIndex('User_Subscriptions', ['user_id']))
    .then(() => queryInterface.addIndex('User_Subscriptions', ['package_id']))
    .then(() => queryInterface.addIndex('User_Subscriptions', ['invoice_id']))
    .then(() => queryInterface.addIndex('User_Subscriptions', ['start_date']))
    .then(() => queryInterface.addIndex('User_Subscriptions', ['end_date']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User_Subscriptions')
    .then(() => queryInterface.removeIndex('User_Subscriptions', ['user_id']))
    .then(() => queryInterface.removeIndex('User_Subscriptions', ['package_id']))
    .then(() => queryInterface.removeIndex('User_Subscriptions', ['invoice_id']))
    .then(() => queryInterface.removeIndex('User_Subscriptions', ['start_date']))
    .then(() => queryInterface.removeIndex('User_Subscriptions', ['end_date']));
  }
};