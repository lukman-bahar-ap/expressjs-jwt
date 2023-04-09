/* eslint-disable no-param-reassign */
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Role = require('./role');
const Menu = require('./menu');

class RoleMenu extends Model {
  static associate() {
    // define association here
    RoleMenu.belongsTo(Role, { as: 'Role', foreignKey: 'role_id' });
    Role.hasMany(RoleMenu);

    RoleMenu.belongsTo(Menu, { as: 'Menu', foreignKey: 'menu_id' });
    Menu.hasMany(RoleMenu);
  }
}

RoleMenu.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_id:
  {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  menu_id:
  {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Menu,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  modelName: 'RoleMenu',
  tableName: 'role_menus',
  timestamps: true,
  underscored: true,
});

module.exports = RoleMenu;
