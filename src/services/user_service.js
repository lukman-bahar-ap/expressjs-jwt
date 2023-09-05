const User = require('../models/user');
const Role = require('../models/role');

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

const showUsersById = async (id) => {
  const query = await User.findOne({
    where: { id },
    include: [
      {
        model: Role,
      },
    ],
  });
  return query;
};

const showUsers = async () => {
  const query = await User.findAll({
    include: [
      {
        model: Role,
      },
    ],
  });
  return query;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  showUsers,
  showUsersById,
};
