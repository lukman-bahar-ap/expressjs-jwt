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
      console.error(error);
      res.sendStatus(500);
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
      console.error(error);
      res.sendStatus(500);
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
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async createRole(req, res) {
    const data = req.body;
    const { name } = data;

    // Validate role input
    if (!name) {
      return res.status(400).send('All input is required');
    }

    try {
      const roleId = await createRole(data);
      return res.status(201).json({ id: roleId });
    } catch (error) {
      console.error(error);
      if (error.errors[0].message !== undefined) {
        return res.status(400).send(error.errors[0].message);
      }
      return res.status(500).send(error);
    }
  }

  static async updateRole(req, res) {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = await updateRole(id, data);
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

  static async deleteRole(req, res) {
    const { id } = req.params;
    try {
      const result = await deleteRole(id);
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
module.exports = RoleController;
