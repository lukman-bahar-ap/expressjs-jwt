// Describe relation / asosiate model on this file, for call on app.js on first running
const Role = require('./role');
const RoleMenu = require('./role_menu');
const RoleMenuPermission = require('./role_menu_permission');
const Menu = require('./menu');
const MenuPermission = require('./menu_permission');
const User = require('./user');

const initRelationForApp = async () => {
  RoleMenu.belongsTo(Role, { foreignKey: 'role_id' });
  Role.hasMany(RoleMenu);

  RoleMenu.belongsTo(Menu, { foreignKey: 'menu_id' });
  Menu.hasMany(RoleMenu);

  RoleMenuPermission.belongsTo(RoleMenu, { foreignKey: 'role_menu_id' });
  RoleMenu.hasMany(RoleMenuPermission);

  RoleMenuPermission.belongsTo(MenuPermission, { foreignKey: 'menu_permission_id' });
  MenuPermission.hasMany(RoleMenuPermission);

  MenuPermission.belongsTo(Menu, { foreignKey: 'menu_id' });
  Menu.hasMany(MenuPermission);

  User.belongsTo(Role, { as: 'Role', foreignKey: 'role_id' });
  Role.hasMany(User);
};

module.exports = { initRelationForApp };
