const bcrypt = require("bcryptjs");
const { User } = require("./user.model");
const Role = require("../roles/role.model");

//add role
const userAddRole = async (req, res) => {
  const { userEmail, roleName } = req.body;

  const userFound = await User.findOne({ where: { email: userEmail } });
  if (!userFound) {
    return res.json({ msg: "user email not encountered" });
  }

  const roleFound = await Role.findOne({ where: { name: roleName } });

  if (!roleFound) {
    return res.json({ msg: "role name not encountered" });
  }

  await userFound.addRole(roleFound);

  res.json({ msg: ` ${userFound.email} is a: ${roleFound.name} now` });
};

//get users
const getUsers = async (_, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] }
  });
  res.status(200).json(users);
};

//get user
const getUser = async (req, res) => {
  const user = await User.findByPk(req.params.userId);

  if (!user) {
    return res.json({ msg: "user id not encountered" });
  }

  res.status(200).json(user);
};

//create user
const createUser = async (req, res) => {
  const { email, nickname, password, role } = req.body;
  const passwordHash = bcrypt.hashSync(password, 8);

  const user = await User.create({
    email,
    nickname,
    password: passwordHash
  });

  const roleFound = await Role.findOne({ where: { name: role } });

  if (!roleFound) {
    return res.json({ msg: "role not found" });
  }

  await user.addRole(roleFound);

  res.json(`new user created, email: ${user.email}`);
};

//update user
const updateUser = async (req, res) => {
  await User.update(req.body, { where: { id: req.params.userId } });
  res.json({ msg: "update ok" });
};

//delete user
const deleteUser = async (req, res) => {
  await User.destroy({ where: { id: req.params.userId } });
  res.json({ msg: "delete ok" });
};

module.exports = {
  userAddRole,
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
