/* eslint-disable camelcase */
const JSONResponse = require('./libs/json_response');
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
      JSONResponse.serverError(res, error);
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
      JSONResponse.serverError(res, error);
    }
  }

  static async createRoleMenuPermission(req, res) {
    const data = req.body;
    const { role_menu_id, menu_permission_id } = data;
    // Validate roleMenuPermission input
    if (!(role_menu_id && menu_permission_id)) {
      JSONResponse.inputRequired(res);
    }

    try {
      const roleMenuPermissionId = await createRoleMenuPermission(data);
      JSONResponse.createdSuccess(res, '', { id: roleMenuPermissionId });
    } catch (error) {
      JSONResponse.createError(res, error);
    }
  }

  static async updateRoleMenuPermission(req, res) {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = await updateRoleMenuPermission(id, data);
      if (result) {
        JSONResponse.success(res, 'data has been updated');
      } else {
        JSONResponse.dataNotFound(res);
      }
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async deleteRoleMenuPermission(req, res) {
    const { id } = req.params;
    try {
      const result = await deleteRoleMenuPermission(id);
      if (result) {
        JSONResponse.success(res, 'deleted');
      } else {
        JSONResponse.dataNotFound(res);
      }
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }
}
module.exports = RoleMenuPermissionController;
