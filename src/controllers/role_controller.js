const JSONResponse = require('./libs/json_response');
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  showGrantAccessRoles,
} = require('../services/role_service');

class RoleController {
  static async getAllRoles(req, res) {
    try {
      const roles = await getRoles();
      res.json(roles);
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async getRoleById(req, res) {
    const { id } = req.params;
    try {
      const role = await getRoleById(id);
      if (role) {
        res.json(role);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async getGrantRoleById(req, res) {
    const { id } = req.params;
    try {
      const role = await showGrantAccessRoles(id);
      if (role) {
        res.json(role);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async createRole(req, res) {
    const data = req.body;
    const { name } = data;

    // Validate role input
    if (!name) {
      JSONResponse.inputRequired(res);
    }

    try {
      const roleId = await createRole(data);
      JSONResponse.createdSuccess(res, '', { id: roleId });
    } catch (error) {
      JSONResponse.createError(res, error);
    }
  }

  static async updateRole(req, res) {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = await updateRole(id, data);
      if (result) {
        JSONResponse.success(res, 'data has been updated');
      } else {
        JSONResponse.dataNotFound(res);
      }
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async deleteRole(req, res) {
    const { id } = req.params;
    try {
      const result = await deleteRole(id);
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
module.exports = RoleController;
