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
    return queryInterface.bulkInsert('Packages',[
      {
        name: 'Bronze',
        description: 'Bronze package',
        request_per_second_limit: 150,
        request_per_day_limit: 300,
        request_per_month_limit: 700,
        price: 10000.01,
        is_trial: true,
        trial_duration: 10000,
        trial_request_limit: 1000
      },
      {
        name: 'Silver',
        description: 'Silver package',
        request_per_second_limit: 250,
        request_per_day_limit: 500,
        request_per_month_limit: 1000,
        price: 100000.01,
        is_trial: false,
        trial_duration: 10000,
        trial_request_limit: 1000
      },
      {
        name: 'Gold',
        description: 'Gold package',
        request_per_second_limit: 500,
        request_per_day_limit: 100,
        request_per_month_limit: 10000,
        price: 1000000.01,
        is_trial: false,
        trial_duration: 10000,
        trial_request_limit: 1000
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
    return queryInterface.bulkDelete('Packages', {
      name: 'Bronze'
    }).then(queryInterface.bulkDelete('Packages', {
      name: 'Silver'
    }).then(queryInterface.bulkDelete('Packages', {
      name: 'Gold'
    })))
  }
};
