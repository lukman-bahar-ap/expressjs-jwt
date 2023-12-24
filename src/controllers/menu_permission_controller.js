/* eslint-disable camelcase */
const JSONResponse = require('./libs/json_response');
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
      JSONResponse.success(res, '', menuPermissions);
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async getAllMenuPermissionsByMenu(req, res) {
    const { menuId } = req.params;
    try {
      const menuPermission = await findMenuPermissionByMenu(menuId);
      if (menuPermission) {
        JSONResponse.success(res, '', menuPermission);
      } else {
        JSONResponse.dataNotFound(res);
      }
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async getMenuPermission(req, res) {
    const { menuId, id } = req.params;
    try {
      const menuPermission = await findMenuPermissionByMenuAndId(menuId, id);
      if (menuPermission) {
        JSONResponse.success(res, '', menuPermission);
      } else {
        JSONResponse.dataNotFound(res);
      }
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async createMenuPermission(req, res) {
    const data = req.body;
    const { name, menu_id } = data;

    // Validate menuPermission input
    if (!(name && menu_id)) {
      JSONResponse.inputRequired(res);
    }

    try {
      const menuPermissionId = await createMenuPermission(data);
      JSONResponse.createdSuccess(res, '', { id: menuPermissionId });
    } catch (error) {
      JSONResponse.createError(res, error);
    }
  }

  static async updateMenuPermission(req, res) {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = await updateMenuPermission(id, data);
      if (result) {
        JSONResponse.success(res, 'data has been updated');
      } else {
        JSONResponse.dataNotFound(res);
      }
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async deleteMenuPermission(req, res) {
    const { id } = req.params;
    try {
      const result = await deleteMenuPermission(id);
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
module.exports = MenuPermissionController;
