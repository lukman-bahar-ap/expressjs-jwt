/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      name: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'password456',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
