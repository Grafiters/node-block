'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_Subsriptions', {
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
    .then(() => queryInterface.addIndex('User_Subsriptions', ['user_id']))
    .then(() => queryInterface.addIndex('User_Subsriptions', ['package_id']))
    .then(() => queryInterface.addIndex('User_Subsriptions', ['invoice_id']))
    .then(() => queryInterface.addIndex('User_Subsriptions', ['start_date']))
    .then(() => queryInterface.addIndex('User_Subsriptions', ['end_date']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User_Subsriptions')
    .then(() => queryInterface.removeIndex('User_Subsriptions', ['user_id']))
    .then(() => queryInterface.removeIndex('User_Subsriptions', ['package_id']))
    .then(() => queryInterface.removeIndex('User_Subsriptions', ['invoice_id']))
    .then(() => queryInterface.removeIndex('User_Subsriptions', ['start_date']))
    .then(() => queryInterface.removeIndex('User_Subsriptions', ['end_date']));
  }
};