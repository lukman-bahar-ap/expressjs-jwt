/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('menus', [{
      name: 'list menu',
      path: '/menus',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Roles',
      path: '/roles',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Users',
      path: '/users',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('menus', null, {});
  },
};
