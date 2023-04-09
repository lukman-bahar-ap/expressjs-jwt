const Menu = require('../models/menu');

async function createMenu(menu) {
  return Menu.create(menu);
}

async function getMenus() {
  return Menu.findAll();
}

async function getMenuById(id) {
  return Menu.findByPk(id);
}

async function updateMenu(id, menu) {
  const { name, path } = menu;
  const updatedMenu = await Menu.update({ name, path }, { where: { id } });
  return updatedMenu[0] === 1;
}

async function deleteMenu(id) {
  const deletedMenu = await Menu.destroy({ where: { id } });
  return deletedMenu === 1;
}

module.exports = {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
};
