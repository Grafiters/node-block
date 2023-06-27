'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Node', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blockchain_id:{
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Blockchain',
          key: 'id'
        }
      },
      connection_speed: {
        type: Sequelize.STRING(50)
      },
      api_interface: {
        allowNull: false,
        type: Sequelize.ENUM('JSON-RPC', 'WS', 'GRAPHQL','Advanced API')
      },
      endpoint: {
        type: Sequelize.STRING(50)
      },
      documentation_link: {
        type: Sequelize.STRING(255)
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
    .then(() => queryInterface.addIndex('Node', ['blockchain_id']))
    .then(() => queryInterface.addIndex('Node', ['connection_speed']))
    .then(() => queryInterface.addIndex('Node', ['api_interface']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Node')
    .then(() => queryInterface.removeIndex('Node', ['blockchain_id']))
    .then(() => queryInterface.removeIndex('Node', ['connection_speed']))
    .then(() => queryInterface.removeIndex('Node', ['api_interface']));
  }
};