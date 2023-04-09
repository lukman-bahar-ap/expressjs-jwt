/* eslint-disable camelcase */
const {
  createRoleMenuPermission,
  getRoleMenuPermissions,
  getRoleMenuPermissionById,
  updateRoleMenuPermission,
  deleteRoleMenuPermission,
} = require('../services/role_menu_permission_service');

class RoleMenuPermissionController {
  static async getAllRoleMenuPermissions(req, res) {
    try {
      const roleMenuPermissions = await getRoleMenuPermissions();
      res.json(roleMenuPermissions);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async getRoleMenuPermissionById(req, res) {
    const { id } = req.params;
    try {
      const roleMenuPermission = await getRoleMenuPermissionById(id);
      if (roleMenuPermission) {
        res.json(roleMenuPermission);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async createRoleMenuPermission(req, res) {
    const data = req.body;
    const { role_menu_id, menu_permission_id } = data;
    // Validate roleMenuPermission input
    if (!(role_menu_id && menu_permission_id)) {
      return res.status(400).send('All input is required');
    }

    try {
      const roleMenuPermissionId = await createRoleMenuPermission(data);
      return res.status(201).json({ id: roleMenuPermissionId });
    } catch (error) {
      console.error(error);
      if (error.errors[0].message !== undefined) {
        return res.status(400).send(error.errors[0].message);
      }
      return res.status(500).send(error);
    }
  }

  static async updateRoleMenuPermission(req, res) {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = await updateRoleMenuPermission(id, data);
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

  static async deleteRoleMenuPermission(req, res) {
    const { id } = req.params;
    try {
      const result = await deleteRoleMenuPermission(id);
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
module.exports = RoleMenuPermissionController;
