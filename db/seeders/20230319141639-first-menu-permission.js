/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* npx sequelize-cli db:seed --seed 20230319141639-first-menu-permission.js */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('menu_permissions', [{
      name: 'Create',
      menu_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Read',
      menu_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Update',
      menu_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Delete',
      menu_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('menu_permissions', null, {});
  },
};
