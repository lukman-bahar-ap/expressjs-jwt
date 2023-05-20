/* eslint-disable camelcase */
const {
  createMenuPermission,
  findMenuPermissionByMenuAndId,
  updateMenuPermission,
  deleteMenuPermission,
  findMenuPermissionByMenu,
  findAllMenuPermissions,
} = require('../services/menu_permission_service');

class MenuPermissionController {
  static async getAllMenuPermissions(req, res) {
    try {
      const menuPermissions = await findAllMenuPermissions();
      res.json(menuPermissions);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async getAllMenuPermissionsByMenu(req, res) {
    const { menuId } = req.params;
    try {
      const menuPermission = await findMenuPermissionByMenu(menuId);
      if (menuPermission) {
        res.json(menuPermission);
      } else {
        console.log('else');
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async getMenuPermission(req, res) {
    const { menuId, id } = req.params;
    try {
      const menuPermission = await findMenuPermissionByMenuAndId(menuId, id);
      if (menuPermission) {
        res.json(menuPermission);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async createMenuPermission(req, res) {
    const data = req.body;
    const { name, menu_id } = data;

    // Validate menuPermission input
    if (!(name && menu_id)) {
      return res.status(400).send('All input is required');
    }

    try {
      const menuPermissionId = await createMenuPermission(data);
      return res.status(201).json({ id: menuPermissionId });
    } catch (error) {
      console.error(error);
      if (error.errors[0].message !== undefined) {
        return res.status(400).send(error.errors[0].message);
      }
      return res.status(500).send(error);
    }
  }

  static async updateMenuPermission(req, res) {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = await updateMenuPermission(id, data);
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

  static async deleteMenuPermission(req, res) {
    const { id } = req.params;
    try {
      const result = await deleteMenuPermission(id);
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
module.exports = MenuPermissionController;
