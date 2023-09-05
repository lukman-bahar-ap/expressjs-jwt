/* eslint-disable no-param-reassign */
const argon2 = require('argon2');
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
    // User.belongsTo(Role, { as: 'Role', foreignKey: 'role_id' });
    // Role.hasMany(User);
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
User.beforeCreate(async (user) => {
  try {
    const hash = await argon2.hash(user.password);
    user.password = hash;
  } catch (err) {
    throw new Error();
  }
});

User.prototype.isValidPassword = async (password) => {
  try {
    if (await argon2.verify(password, this.password)) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error();
  }
};

module.exports = User;
