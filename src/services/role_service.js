const Role = require('../models/role');

async function createRole(role) {
  return Role.create(role);
}

async function getRoles() {
  return Role.findAll();
}

async function getRoleById(id) {
  return Role.findByPk(id);
}

async function updateRole(id, role) {
  const { name } = role;
  const updatedRole = await Role.update({ name }, { where: { id } });
  return updatedRole[0] === 1;
}

async function deleteRole(id) {
  const deletedRole = await Role.destroy({ where: { id } });
  return deletedRole === 1;
}

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
