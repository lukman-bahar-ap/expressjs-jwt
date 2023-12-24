const JSONResponse = require('./libs/json_response');
const { createUser, getUserById } = require('../services/user_service');
const { createJwtToken, destroyToken, checkLoginAuth } = require('../services/auth_service');

class AuthController {
  static async login(req, res) {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        JSONResponse.inputRequired(res, req.body);
      }

      const checkedUser = await checkLoginAuth(email, password);
      if (checkedUser.status === 200) {
        JSONResponse.success(res, '', checkedUser.data);
      }

      JSONResponse.unauthorized(res, checkedUser.message);
    } catch (err) {
      JSONResponse.serverError(res, err);
    }
  }

  static async register(req, res) {
    const data = req.body;
    const { name, email, password } = data;

    // Validate user input
    if (!(email && password && name)) {
      JSONResponse.inputRequired(res, req.body);
    }

    try {
      const userId = await createUser(data);
      const token = await createJwtToken(data);
      JSONResponse.createdSuccess(res, '', { id: userId, token });
    } catch (error) {
      JSONResponse.createError(res, error);
    }
  }

  static async logout(req, res) {
    const token = req.headers['x-access-token'];
    if (!token) JSONResponse.unauthorized(res);

    try {
      const { id } = req.body;
      const user = await getUserById(id);
      if (!user) {
        JSONResponse.unauthorized(res, 'user unkown, not registered before');
      }

      const decodedToken = await destroyToken(token, user);
      if (decodedToken === true) {
        res.setHeader('Clear-Site-Data', '"cookies"');
        JSONResponse.success(res, 'Logout successful');
      }
      JSONResponse.unauthorized(res, `something wrong, ${decodedToken}`);
    } catch (err) {
      JSONResponse.unauthorized(res, err);
    }
  }
}

module.exports = AuthController;
