const JSONResponse = require('./libs/json_response');
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
      JSONResponse.success(res, '', menus);
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async getMenuById(req, res) {
    const { id } = req.params;
    try {
      const menu = await getMenuById(id);
      if (menu) {
        JSONResponse.success(res, '', menu);
      } else {
        JSONResponse.dataNotFound(res);
      }
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async createMenu(req, res) {
    const data = req.body;
    const { name, path } = data;

    // Validate menu input
    if (!(name && path)) {
      JSONResponse.inputRequired(res);
    }

    try {
      const menuId = await createMenu(data);
      JSONResponse.createdSuccess(res, '', { id: menuId });
    } catch (error) {
      JSONResponse.createError(res, error);
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
      JSONResponse.serverError(res, error);
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
      JSONResponse.serverError(res, error);
    }
  }
}
module.exports = MenuController;
