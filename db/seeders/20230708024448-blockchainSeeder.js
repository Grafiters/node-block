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
    return queryInterface.bulkInsert('Blockchain',[
      {
        blockchain_name: 'ETH',
        height: 123456,
        network: 'Mainnet',
        version: '2.0.0',
        location: 'Singapura',
      },
      {
        blockchain_name: 'ETH',
        height: 123456,
        network: 'Testnet',
        version: '2.0.0',
        location: 'Singapura',
      },
      {
        blockchain_name: 'BTC',
        height: 123456,
        network: 'Mainnet',
        version: '2.0.0',
        location: 'Singapura',
      },
      {
        blockchain_name: 'BTC',
        height: 123456,
        network: 'Testnet',
        version: '2.0.0',
        location: 'Singapura',
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Blockchains', {
      blockchain_name: 'ETH'
    }).then(queryInterface.bulkDelete('Blockchains', {
      blockchain_name: 'BTC'
    }));
  }
};
