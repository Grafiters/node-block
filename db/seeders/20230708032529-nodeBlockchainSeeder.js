'use strict';

const model = require('../models')
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

    return queryInterface.bulkInsert('Node',[
      {
        blockchain_id: 1,
        connection_speed: 'medium',
        api_interface: 'JSON-RPC',
        endpoint: 'https://ethereum.publicnode.com',
        documentation_link: 'https://ethereum.org/en/developers/docs/apis/json-rpc/',
      },
      {
        blockchain_id: 1,
        connection_speed: 'speed',
        api_interface: 'WS',
        endpoint: 'wss://ethereum.publicnode.com',
        documentation_link: 'https://ethereum.org/en/developers/docs/apis/json-rpc/',
      },
      {
        blockchain_id: 2,
        connection_speed: 'medium',
        api_interface: 'JSON-RPC',
        endpoint: 'https://eth-goerli.api.onfinality.io/public',
        documentation_link: 'https://ethereum.org/en/developers/docs/apis/json-rpc/',
      },
      {
        blockchain_id: 2,
        connection_speed: 'speed',
        api_interface: 'WS',
        endpoint: 'wss://eth-goerli.api.onfinality.io/public',
        documentation_link: 'https://ethereum.org/en/developers/docs/apis/json-rpc/',
      },
      {
        blockchain_id: 3,
        connection_speed: 'medium',
        api_interface: 'JSON-RPC',
        endpoint: 'https://mainnet.chainx.org/rpc',
        documentation_link: 'https://ethereum.org/en/developers/docs/apis/json-rpc/',
      },
      {
        blockchain_id: 3,
        connection_speed: 'speed',
        api_interface: 'WS',
        endpoint: 'wss://mainnet.chainx.org/rpc',
        documentation_link: 'https://ethereum.org/en/developers/docs/apis/json-rpc/',
      },
      {
        blockchain_id: 4,
        connection_speed: 'medium',
        api_interface: 'JSON-RPC',
        endpoint: 'https://connect.bitcoinevm.com',
        documentation_link: 'https://ethereum.org/en/developers/docs/apis/json-rpc/',
      },
      {
        blockchain_id: 4,
        connection_speed: 'speed',
        api_interface: 'WS',
        endpoint: 'wss://connect.bitcoinevm.com',
        documentation_link: 'https://ethereum.org/en/developers/docs/apis/json-rpc/',
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
      model.Node.destroy({
        truncate: true
    })
  }
};
