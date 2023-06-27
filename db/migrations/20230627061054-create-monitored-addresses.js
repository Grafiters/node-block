'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MonitoredAddresses', {
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
      address: {
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
    .then(() => queryInterface.addIndex('MonitoredAddresses', ['user_id']))
    .then(() => queryInterface.addIndex('MonitoredAddresses', ['address']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MonitoredAddresses')
    .then(() => queryInterface.removeIndex('MonitoredAddresses', ['user_id']))
    .then(() => queryInterface.removeIndex('MonitoredAddresses', ['address']));
  }
};