'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING(50)
      },
      description: {
        type: Sequelize.TEXT('long')
      },
      request_per_second_limit: {
        type: Sequelize.INTEGER
      },
      request_per_day_limit: {
        type: Sequelize.INTEGER
      },
      request_per_month_limit: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      is_trial: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      trial_duration: {
        type: Sequelize.INTEGER
      },
      trial_request_limit: {
        type: Sequelize.INTEGER
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Packages');
  }
};