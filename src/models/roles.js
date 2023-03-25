/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

// Hash passwords before saving
User.beforeCreate((user) => bcrypt.hash(user.password, 10)
  .then((hash) => {
    user.password = hash;
  })
  .catch(() => {
    throw new Error();
  }));

User.prototype.isValidPassword = async (password) => bcrypt.compare(password, this.password);

module.exports = User;
