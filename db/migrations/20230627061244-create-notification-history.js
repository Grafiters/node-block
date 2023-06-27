'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NotificationHistory', {
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
      event_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'SmartContractEvents',
          key: 'id'
        }
      },
      address_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'MonitoredAddresses',
          key: 'id'
        }
      },
      notification_type: {
        allowNull: false,
        type: Sequelize.ENUM('Email', 'WebSocket', 'Other')
      },
      notification_time: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      notification_status:{
        allowNull: false,
        type: Sequelize.ENUM('Sent', 'Delivered', 'Failed')
      },
      data: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    })
    .then(() => queryInterface.addIndex('NotificationHistory', ['user_id']))
    .then(() => queryInterface.addIndex('NotificationHistory', ['event_id']))
    .then(() => queryInterface.addIndex('NotificationHistory', ['address_id']))
    .then(() => queryInterface.addIndex('NotificationHistory', ['notification_type']))
    .then(() => queryInterface.addIndex('NotificationHistory', ['notification_status']))
    .then(() => queryInterface.addIndex('NotificationHistory', ['notification_time']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('NotificationHistory')
    .then(() => queryInterface.removeIndex('NotificationHistory', ['user_id']))
    .then(() => queryInterface.removeIndex('NotificationHistory', ['event_id']))
    .then(() => queryInterface.removeIndex('NotificationHistory', ['address_id']))
    .then(() => queryInterface.removeIndex('NotificationHistory', ['notification_type']))
    .then(() => queryInterface.removeIndex('NotificationHistory', ['notification_status']))
    .then(() => queryInterface.removeIndex('NotificationHistory', ['notification_time']));
  }
};