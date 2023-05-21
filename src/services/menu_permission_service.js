/* eslint-disable camelcase */
const MenuPermission = require('../models/menu_permission');

async function createMenuPermission(menuPermission) {
  return MenuPermission.create(menuPermission);
}

async function findAllMenuPermissions() {
  return MenuPermission.findAll();
}

async function findMenuPermissionByMenu(id) {
  return MenuPermission.findAll({ where: { menu_id: id } });
}

async function findMenuPermissionByMenuAndId(menuId, id) {
  return MenuPermission.findOne({ where: { id, menu_id: menuId } });
}

async function getMenuPermissionById(id) {
  return MenuPermission.findByPk(id);
}

async function updateMenuPermission(id, menuPermission) {
  const { name, menu_id } = menuPermission;
  const updateFromModel = await MenuPermission.update({ name, menu_id }, { where: { id } });
  return updateFromModel[0] === 1;
}

async function deleteMenuPermission(id) {
  const deleteFromModel = await MenuPermission.destroy({ where: { id } });
  return deleteFromModel === 1;
}

module.exports = {
  findMenuPermissionByMenu,
  createMenuPermission,
  findAllMenuPermissions,
  getMenuPermissionById,
  updateMenuPermission,
  deleteMenuPermission,
  findMenuPermissionByMenuAndId,
};
