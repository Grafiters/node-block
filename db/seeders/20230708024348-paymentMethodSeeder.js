'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('PaymentMethods',[
    {
      name: 'BCA_VA',
      description: 'Payment with BCA_VIRTUAL_ACCOUNT',
      is_crypto: false,
      gateway: 'https://api.xendit.co'
    },
    {
      name: 'BCA',
      description: 'Payment with BCA',
      is_crypto: false,
      gateway: 'https://api.xendit.co'
    },
    {
      name: 'OVO',
      description: 'Payment with OVO Ewallet',
      is_crypto: false,
      gateway: 'https://api.xendit.co'
    },
    {
      name: 'CRYPTO',
      description: 'Payment with CRYPTO',
      is_crypto: true,
      gateway: 'https://testnet.demo.btcpayserver.org'
    }
   ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('PaymentMethods', {
        name: 'BCA_VA'
      }).then(queryInterface.bulkDelete('PaymentMethods', {
        name: 'BCA'
      })).then(queryInterface.bulkDelete('PaymentMethods', {
        name: 'OVO'
      })).then(queryInterface.bulkDelete('PaymentMethods', {
        name: 'CRYPTO'
      }));
  }
};
