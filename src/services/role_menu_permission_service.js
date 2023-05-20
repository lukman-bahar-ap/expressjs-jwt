/* eslint-disable camelcase */
const RoleMenuPermission = require('../models/role_menu_permission');

const createRoleMenuPermission = async (data) => RoleMenuPermission.create(data);

const getRoleMenuPermissions = async () => RoleMenuPermission.findAll();

const getRoleMenuPermissionById = async (id) => RoleMenuPermission.findByPk(id);

const updateRoleMenuPermission = async (id, data) => {
  const updateData = {
    role_menu_id: data.role_menu_id,
    menu_permission_id: data.menu_permission_id,
  };
  const updateFromModel = await RoleMenuPermission.update(updateData, { where: { id } });
  return updateFromModel[0] === 1;
};

const deleteRoleMenuPermission = async (id) => {
  const deleteFromModel = await RoleMenuPermission.destroy({ where: { id } });
  return deleteFromModel === 1;
};

module.exports = {
  createRoleMenuPermission,
  getRoleMenuPermissions,
  getRoleMenuPermissionById,
  updateRoleMenuPermission,
  deleteRoleMenuPermission,
};
