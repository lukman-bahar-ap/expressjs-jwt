const Menu = require('../models/menu');

const createMenu = async (menu) => Menu.create(menu);

const getMenus = async () => Menu.findAll();

const getMenuById = async (id) => Menu.findByPk(id);

const updateMenu = async (id, menu) => {
  const { name, path } = menu;
  const updatedMenu = await Menu.update({ name, path }, { where: { id } });
  return updatedMenu[0] === 1;
};

const deleteMenu = async (id) => {
  const deletedMenu = await Menu.destroy({ where: { id } });
  return deletedMenu === 1;
};

module.exports = {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
};
