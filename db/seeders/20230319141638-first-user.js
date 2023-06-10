/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

const argon2 = require('argon2');

const hashpass = async (pass) => {
  try {
    const hash = await argon2.hash(pass);
    return hash;
  } catch (err) {
    throw new Error();
  }
};

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
