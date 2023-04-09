const {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require('../services/menu_service');

class MenuController {
  static async getAllMenus(req, res) {
    try {
      const menus = await getMenus();
      res.json(menus);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async getMenuById(req, res) {
    const { id } = req.params;
    try {
      const menu = await getMenuById(id);
      if (menu) {
        res.json(menu);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async createMenu(req, res) {
    const data = req.body;
    const { name, path } = data;

    // Validate menu input
    if (!(name && path)) {
      return res.status(400).send('All input is required');
    }

    try {
      const menuId = await createMenu(data);
      return res.status(201).json({ id: menuId });
    } catch (error) {
      console.error(error);
      if (error.errors[0].message !== undefined) {
        return res.status(400).send(error.errors[0].message);
      }
      return res.status(500).send(error);
    }
  }

  static async updateMenu(req, res) {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = await updateMenu(id, data);
      if (result) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async deleteMenu(req, res) {
    const { id } = req.params;
    try {
      const result = await deleteMenu(id);
      if (result) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}
module.exports = MenuController;
