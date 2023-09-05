/* eslint-disable no-param-reassign */
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Menu = require('./menu');

class MenuPermission extends Model {
  static associate() {
    // define association here
    // MenuPermission.belongsTo(Menu, { as: 'Menu', foreignKey: 'menu_id' });
    // Menu.hasMany(MenuPermission);
  }
}

MenuPermission.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
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
  modelName: 'MenuPermission',
  tableName: 'menu_permissions',
  timestamps: true,
  underscored: true,
});

module.exports = MenuPermission;
