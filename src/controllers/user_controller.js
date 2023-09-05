const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  showUsers,
} = require('../services/user_service');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async getAllUsersWithRole(req, res) {
    try {
      const users = await showUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async createUser(req, res) {
    const data = req.body;
    const { name, email, password } = data;

    // Validate user input
    if (!(email && password && name)) {
      return res.status(400).send('All input is required');
    }

    try {
      const userId = await createUser(data);
      return res.status(201).json({ id: userId });
    } catch (error) {
      console.error(error);
      if (error.errors[0].message !== undefined) {
        return res.status(400).send(error.errors[0].message);
      }
      return res.status(500).send(error);
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = await updateUser(id, data);
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

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const result = await deleteUser(id);
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
module.exports = UserController;
