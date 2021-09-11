const bcrypt = require("bcryptjs");
const User = require("./user.model");

const getUsers = async (_, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] }
  });
  res.status(200).json(users);
};
const getUser = async (req, res) => {
  const user = await User.findByPk(req.params.userId);

  if (!user) {
    return res.json({ msg: "user id not encountered" });
  }

  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const { email, nickname, password, role } = req.body;
  const passwordHash = bcrypt.hashSync(password, 8);
  const user = await User.create({
    email,
    nickname,
    password: passwordHash,
    role
  });

  res.json(`new user created, email: ${user.email}`);
};

const updateUser = async (req, res) => {
  await User.update(req.body, { where: { id: req.params.userId } });
  res.json({ msg: "update ok" });
};

const deleteUser = async (req, res) => {
  await User.destroy({ where: { id: req.params.userId } });
  res.json({ msg: "delete ok" });
};

module.exports = { getUser, getUsers, createUser, updateUser, deleteUser };
