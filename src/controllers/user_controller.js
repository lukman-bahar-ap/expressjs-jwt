const JSONResponse = require('./libs/json_response');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  showUsers,
} = require('../services/user_service');
const JsonResponse = require('./libs/json_response');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await getUsers();
      JSONResponse.success(res, '', users);
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async getAllUsersWithRole(req, res) {
    try {
      const users = await showUsers();
      JSONResponse.success(res, '', users);
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await getUserById(id);
      if (user) {
        JSONResponse.success(res, '', user);
      } else {
        JSONResponse.dataNotFound(res);
      }
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async createUser(req, res) {
    const data = req.body;
    const { name, email, password } = data;

    // Validate user input
    if (!(email && password && name)) {
      JSONResponse.inputRequired(res);
    }

    try {
      const userId = await createUser(data);
      JsonResponse.createdSuccess(res, '', { id: userId });
    } catch (error) {
      JSONResponse.createError(res, error);
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = await updateUser(id, data);
      if (result) {
        JSONResponse.success(res, 'data has been updated');
      } else {
        JSONResponse.dataNotFound(res);
      }
    } catch (error) {
      JSONResponse.serverError(res, error);
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const result = await deleteUser(id);
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
module.exports = UserController;
