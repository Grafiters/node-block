'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      package_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Packages',
          key: 'id'
        }
      },
      payment_method_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'PaymentMethods',
          key: 'id'
        }
      },
      payment_due_date: {
        type: "TIMESTAMP",
        allowNull: false,
      },
      payment_date: {
        type: "TIMESTAMP",
        allowNull: true
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2)
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('unpaid', 'paid', 'overdue'),
        defaultValue: 'unpaid'
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
    .then(() => queryInterface.addIndex('Invoices', ['package_id']))
    .then(() => queryInterface.addIndex('Invoices', ['payment_method_id']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Invoices')
    .then(() => queryInterface.removeIndex('Invoices', ['package_id']))
    .then(() => queryInterface.removeIndex('Invoices', ['payment_method_id']));
  }
};