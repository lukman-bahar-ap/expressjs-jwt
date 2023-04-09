/* eslint-disable camelcase */
const RoleMenuPermission = require('../models/role_menu_permission');

async function createRoleMenuPermission(roleMenuPermission) {
  return RoleMenuPermission.create(roleMenuPermission);
}

async function getRoleMenuPermissions() {
  return RoleMenuPermission.findAll();
}

async function getRoleMenuPermissionById(id) {
  return RoleMenuPermission.findByPk(id);
}

async function updateRoleMenuPermission(id, roleMenuPermission) {
  const updateData = {
    role_menu_id: roleMenuPermission.role_menu_id,
    menu_permission_id: roleMenuPermission.menu_permission_id,
  };
  const updateFromModel = await RoleMenuPermission.update(updateData, { where: { id } });
  return updateFromModel[0] === 1;
}

async function deleteRoleMenuPermission(id) {
  const deleteFromModel = await RoleMenuPermission.destroy({ where: { id } });
  return deleteFromModel === 1;
}

module.exports = {
  createRoleMenuPermission,
  getRoleMenuPermissions,
  getRoleMenuPermissionById,
  updateRoleMenuPermission,
  deleteRoleMenuPermission,
};
