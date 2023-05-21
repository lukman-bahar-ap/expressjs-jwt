/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_menu_permissions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_menu_id:
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'role_menus',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      menu_permission_id:
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'menu_permissions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role_menu_permissions');
  },
};
