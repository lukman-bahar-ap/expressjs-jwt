const User = require('../models/user');

const createUser = async (data) => User.create(data);

const getUsers = async () => User.findAll();

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const getUserById = async (id) => User.findByPk(id);

const updateUser = async (id, user) => {
  const {
    name, email, password,
  } = user;
  const updatedUser = await User.update({ name, email, password }, { where: { id } });
  return updatedUser[0] === 1;
};

const deleteUser = async (id) => {
  const deletedUser = await User.destroy({ where: { id } });
  return deletedUser === 1;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
};
