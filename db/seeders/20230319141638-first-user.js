/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

const bcrypt = require('bcrypt');

const hashpass = async (pass) => bcrypt.hash(pass, 10)
  .then((hash) => hash)
  .catch(() => {
    throw new Error();
  });

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      name: 'admin',
      email: 'admin@admin.com',
      password: await hashpass('admin'),
      role_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: await hashpass('password456'),
      role_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
