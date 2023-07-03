'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    const passwordAdmin = await bcrypt.hash('7Dragon7', 10)
    const passwordAlone = await bcrypt.hash('Alone123!*', 10)

    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@nusatechblockchain.id',
        password_digest: passwordAdmin,
        role: 'Admin',
        email_verification_token: '000000',
        email_verified_at: new Date(),
      },
      {
        email: 'alone@kuacislayer.id',
        password_digest: passwordAlone,
        role: 'Admin',
        email_verification_token: '000000',
        email_verified_at: new Date(),
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    // return queryInterface.bulkDelete('People', null, {email});
      return queryInterface.bulkDelete('Users', {
        email: 'admin@nusatechblockchain.id'
      }).then(queryInterface.bulkDelete('Users', {
        email: 'alone@kuacislayer.id'
      }));
  }
};
