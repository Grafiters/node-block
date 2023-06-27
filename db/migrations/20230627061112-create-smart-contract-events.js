'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SmartContractEvents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      contract_address: {
        type: Sequelize.STRING(255)
      },
      event_name: {
        type: Sequelize.STRING(255)
      },
      notification_method: {
        allowNull: false,
        type: Sequelize.ENUM('Email', 'WebSocket', 'Other')
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    })
    .then(() => queryInterface.addIndex('SmartContractEvents', ['user_id']))
    .then(() => queryInterface.addIndex('SmartContractEvents', ['contract_address']))
    .then(() => queryInterface.addIndex('SmartContractEvents', ['event_name']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SmartContractEvents')
    .then(() => queryInterface.removeIndex('SmartContractEvents', ['user_id']))
    .then(() => queryInterface.removeIndex('SmartContractEvents', ['contract_address']))
    .then(() => queryInterface.removeIndex('SmartContractEvents', ['event_name']));
  }
};