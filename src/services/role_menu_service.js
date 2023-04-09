/* eslint-disable camelcase */
const RoleMenu = require('../models/role_menu');

async function createRoleMenu(roleMenu) {
  return RoleMenu.create(roleMenu);
}

async function getRoleMenus() {
  return RoleMenu.findAll();
}

async function getRoleMenuById(id) {
  return RoleMenu.findByPk(id);
}

async function updateRoleMenu(id, roleMenu) {
  const { role_id, menu_id } = roleMenu;
  const updatedRoleMenu = await RoleMenu.update({ role_id, menu_id }, { where: { id } });
  return updatedRoleMenu[0] === 1;
}

async function deleteRoleMenu(id) {
  const deletedRoleMenu = await RoleMenu.destroy({ where: { id } });
  return deletedRoleMenu === 1;
}

module.exports = {
  createRoleMenu,
  getRoleMenus,
  getRoleMenuById,
  updateRoleMenu,
  deleteRoleMenu,
};
