const User = require('../models/user');

async function createUser(user) {
  return User.create(user);
}

async function getUsers() {
  return User.findAll();
}

async function getUserByEmail(email) {
  return User.findOne({ where: { email } });
}

async function getUserById(id) {
  return User.findByPk(id);
}

async function updateUser(id, user) {
  const {
    name, email, password,
  } = user;
  const updatedUser = await User.update({ name, email, password }, { where: { id } });
  return updatedUser[0] === 1;
}

async function deleteUser(id) {
  const deletedUser = await User.destroy({ where: { id } });
  return deletedUser === 1;
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
};
