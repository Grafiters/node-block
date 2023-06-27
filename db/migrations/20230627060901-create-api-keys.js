'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Api_Keys', {
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
      label: {
        type: Sequelize.STRING(255)
      },
      api_key: {
        type: Sequelize.STRING(255)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addIndex('Api_Keys', ['user_id']))
    .then(() => queryInterface.addIndex('Api_Keys', ['api_key']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Api_Keys');
  }
};