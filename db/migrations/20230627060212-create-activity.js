'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Activity', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      user_id:{
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      ip_address: {
        type: Sequelize.STRING(50)
      },
      country:{
        type: Sequelize.STRING(50)
      },
      user_agent: {
        type: Sequelize.STRING(255)
      },
      action: {
        type: Sequelize.STRING(100)
      },
      action_result: {
        type: Sequelize.STRING(100)
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
    }).then(() => queryInterface.addIndex('Activity', ['user_id']))
    .then(() => queryInterface.addIndex('Activity', ['created_at']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Activity')
    .then(() => queryInterface.removeIndex('Activity', ['user_id']))
    .then(() => queryInterface.removeIndex('Activity', ['created_at']));;
  }
};