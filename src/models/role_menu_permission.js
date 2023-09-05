/* eslint-disable no-param-reassign */
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const RoleMenu = require('./role_menu');
const MenuPermission = require('./menu_permission');

class RoleMenuPermission extends Model {
  static associate() {
    // define association here
    // RoleMenuPermission.belongsTo(RoleMenu, {  foreignKey: 'role_menu_id' });
    // RoleMenu.hasMany(RoleMenuPermission);

    // RoleMenuPermission.belongsTo(MenuPermission, {  foreignKey: 'menu_permission_id' });
    // MenuPermission.hasMany(RoleMenuPermission);
  }
}

RoleMenuPermission.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_menu_id:
  {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RoleMenu,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  menu_permission_id:
  {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MenuPermission,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  modelName: 'RoleMenuPermission',
  tableName: 'role_menu_permissions',
  timestamps: true,
  underscored: true,
});

module.exports = RoleMenuPermission;
