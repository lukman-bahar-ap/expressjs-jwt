/* eslint-disable camelcase */
const JSONResponse = require('./libs/json_response');
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
      JSONResponse.serverError(res, error);
    }
  }

  static async getMenuByRoles(req, res) {
    const { id } = req.params;
    try {
      const roleMenus = await showRoleMenus(id);
      res.json(roleMenus);
    } catch (error) {
      JSONResponse.serverError(res, error);
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
      JSONResponse.serverError(res, error);
    }
  }

  static async createRoleMenu(req, res) {
    const data = req.body;
    const { role_id, menu_id } = data;
    // Validate roleMenu input
    if (!(role_id && menu_id)) {
      JSONResponse.inputRequired(res);
    }

    try {
      const roleMenuId = await createRoleMenu(data);
      JSONResponse.createdSuccess(res, '', { id: roleMenuId });
    } catch (error) {
      JSONResponse.createError(res, error);
    }
  }

  static async updateRoleMenu(req, res) {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = await updateRoleMenu(id, data);
      if (result) {
        JSONResponse.success(res, 'data has been updated');
      } else {
        JSONResponse.dataNotFound(res);
      }
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async deleteRoleMenu(req, res) {
    const { id } = req.params;
    try {
      const result = await deleteRoleMenu(id);
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
module.exports = RoleMenuController;
