/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Role = require('./role');

class User extends Model {
  /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  static associate() {
    // define association here
    User.belongsTo(Role, { as: 'Role', foreignKey: 'role_id' });
    Role.hasMany(User);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
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
