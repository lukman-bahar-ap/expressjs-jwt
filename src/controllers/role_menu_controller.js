/* eslint-disable camelcase */
const {
  createRoleMenu,
  getRoleMenus,
  getRoleMenuById,
  updateRoleMenu,
  deleteRoleMenu,
  showRoleMenus,
} = require('../services/role_menu_service');

class RoleMenuController {
  static async getAllRoleMenus(req, res) {
    try {
      const roleMenus = await getRoleMenus();
      res.json(roleMenus);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async getMenuByRoles(req, res) {
    const { id } = req.params;
    try {
      const roleMenus = await showRoleMenus(id);
      res.json(roleMenus);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async getRoleMenuById(req, res) {
    const { id } = req.params;
    try {
      const roleMenu = await getRoleMenuById(id);
      if (roleMenu) {
        res.json(roleMenu);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async createRoleMenu(req, res) {
    const data = req.body;
    const { role_id, menu_id } = data;
    // Validate roleMenu input
    if (!(role_id && menu_id)) {
      return res.status(400).send('All input is required');
    }

    try {
      const roleMenuId = await createRoleMenu(data);
      return res.status(201).json({ id: roleMenuId });
    } catch (error) {
      console.error(error);
      if (error.errors[0].message !== undefined) {
        return res.status(400).send(error.errors[0].message);
      }
      return res.status(500).send(error);
    }
  }

  static async updateRoleMenu(req, res) {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = await updateRoleMenu(id, data);
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

  static async deleteRoleMenu(req, res) {
    const { id } = req.params;
    try {
      const result = await deleteRoleMenu(id);
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
module.exports = RoleMenuController;
