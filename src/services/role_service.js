const Role = require('../models/role');
const RoleMenu = require('../models/role_menu');
const RoleMenuPermission = require('../models/role_menu_permission');
const Menu = require('../models/menu');
const MenuPermission = require('../models/menu_permission');

const createRole = async (role) => Role.create(role);

const getRoles = async () => Role.findAll();

const getRoleById = async (id) => Role.findByPk(id);

const updateRole = async (id, role) => {
  const { name } = role;
  const updatedRole = await Role.update({ name }, { where: { id } });
  return updatedRole[0] === 1;
};

const deleteRole = async (id) => {
  const deletedRole = await Role.destroy({ where: { id } });
  return deletedRole === 1;
};

const showGrantAccessRoles = async (id) => {
  const query = await RoleMenu.findAll({
    where: { role_id: id },
    include: [
      {
        model: Menu,
      }, {
        model: RoleMenuPermission,
        include: [{
          model: MenuPermission,
        }],
      },
    ],
  });
  return query;
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  showGrantAccessRoles,
};
