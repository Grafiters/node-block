'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Blockchain', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blockchain_name: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.INTEGER
      },
      network: {
        type: Sequelize.STRING(50)
      },
      version: {
        type: Sequelize.STRING(50)
      },
      location: {
        type: Sequelize.STRING(50)
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
    .then(() => queryInterface.addIndex('Blockchain', ['blockchain_name']))
    .then(() => queryInterface.addIndex('Blockchain', ['network']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Blockchain')
    .then(() => queryInterface.removeIndex('Blockchain', ['blockchain_name']))
    .then(() => queryInterface.removeIndex('Blockchain', ['network']));
  }
};