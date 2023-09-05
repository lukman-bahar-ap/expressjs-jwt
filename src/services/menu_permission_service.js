/* eslint-disable camelcase */
const MenuPermission = require('../models/menu_permission');

const createMenuPermission = async (data) => MenuPermission.create(data);

const findAllMenuPermissions = async () => MenuPermission.findAll();

const findMenuPermissionByMenu = async (id) => MenuPermission.findAll({ where: { menu_id: id } });

const findMenuPermissionByMenuAndId = async (menu_id, id) => {
  MenuPermission.findOne({ where: { id, menu_id } });
};

const getMenuPermissionById = async (id) => MenuPermission.findByPk(id);

const updateMenuPermission = async (id, data) => {
  const { name, menu_id } = data;
  const updateFromModel = await MenuPermission.update({ name, menu_id }, { where: { id } });
  return updateFromModel[0] === 1;
};

const deleteMenuPermission = async (id) => {
  const deleteFromModel = await MenuPermission.destroy({ where: { id } });
  return deleteFromModel === 1;
};

module.exports = {
  findMenuPermissionByMenu,
  createMenuPermission,
  findAllMenuPermissions,
  getMenuPermissionById,
  updateMenuPermission,
  deleteMenuPermission,
  findMenuPermissionByMenuAndId,
};
