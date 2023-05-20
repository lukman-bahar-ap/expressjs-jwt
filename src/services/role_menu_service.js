/* eslint-disable camelcase */
const RoleMenu = require('../models/role_menu');
const Menu = require('../models/menu');

const createRoleMenu = async (roleMenu) => RoleMenu.create(roleMenu);

const getRoleMenus = async () => RoleMenu.findAll();

const getRoleMenuById = async (id) => RoleMenu.findByPk(id);

const showRoleMenus = async (id) => {
  // RoleMenu.belongsTo(Menu, { foreignKey: 'menu_id' });
  const query = await RoleMenu.findAll({
    where: { role_id: id },
    include: [
      {
        model: Menu,
      },
    ],
  });
  return query;
};

const updateRoleMenu = async (id, roleMenu) => {
  const { role_id, menu_id } = roleMenu;
  const updatedRoleMenu = await RoleMenu.update({ role_id, menu_id }, { where: { id } });
  return updatedRoleMenu[0] === 1;
};

const deleteRoleMenu = async (id) => {
  const deletedRoleMenu = await RoleMenu.destroy({ where: { id } });
  return deletedRoleMenu === 1;
};

module.exports = {
  createRoleMenu,
  getRoleMenus,
  getRoleMenuById,
  updateRoleMenu,
  deleteRoleMenu,
  showRoleMenus,
};
