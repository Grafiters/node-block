'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RequestStatistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      api_key_id:{
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Api_Keys',
          key: 'id'
        }
      },
      ip_address: {
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
      endpoint: {
        type: Sequelize.STRING(255)
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    })
    .then(() => queryInterface.addIndex('RequestStatistics', ['api_key_id']))
    .then(() => queryInterface.addIndex('RequestStatistics', ['created_at']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RequestStatistics')
    .then(() => queryInterface.removeIndex('RequestStatistics', ['api_key_id']))
    .then(() => queryInterface.removeIndex('RequestStatistics', ['created_at']));
  }
};