const { createUser } = require('../services/user_service');
const { createJwtToken, destroyToken, checkAuth } = require('../services/auth_service');

class AuthController {
  static async login(req, res) {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        return res.status(400).send('All input is required');
      }

      const checkedUser = await checkAuth(email, password);
      if (checkedUser.status === 200) {
        return res.status(200).send(checkedUser);
      }

      return res.status(400).send(checkedUser.message);
    } catch (err) {
      console.log(err);
      return res.status(500).send('some error');
    }
  }

  static async register(req, res) {
    const data = req.body;
    const { name, email, password } = data;

    // Validate user input
    if (!(email && password && name)) {
      return res.status(400).send('All input is required');
    }

    try {
      const userId = await createUser(data);
      const token = await createJwtToken(data);
      return res.status(201).json({ id: userId, token });
    } catch (error) {
      console.error(error);
      try {
        return res.status(400).send(error.errors[0].message);
      } catch {
        return res.status(500).send(error);
      }
    }
  }

  static async logout(req, res) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ message: 'Unauthorized' });

    try {
      const decodedToken = await destroyToken(token);
      if (decodedToken === true) {
        return res.status(200).send({ message: 'Logout successful' });
      }
      return res.status(401).send({ message: 'something wrong' });
    } catch (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }
}

module.exports = AuthController;
