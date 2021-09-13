const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../users/user.model");
const Role = require("../roles/role.model");


const { configEnv } = require("../../config/config");

const register = async (req, res) => {
  const { email, nickname, password } = req.body;

  const roleFound = await Role.findOne({ where: { name: "user" } });

  if (!roleFound) {
    return res.json({ msg: "role name not encountered" });
  }
  const passwordHash = bcryptjs.hashSync(password, 8);
  const user = await User.create({
    email,
    nickname,
    password: passwordHash
  });
  await user.addRole(roleFound);

  res.json(`new user created, email: ${user.email}`);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //verify if user exist
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(400).json({ msg: "invalid user or password" });
    }
    //verify match password
    const matchPassword = bcryptjs.compareSync(
      password,
      user.getDataValue("password")
    );

    if (!matchPassword) {
      return res.status(400).json({ msg: "invalid user or password" });
    }
    const userId = user.getDataValue("id");
    //create token
    const token = jwt.sign({ userId }, configEnv.dbJwtSecret, {
      expiresIn: "24h"
    });
    //const token = await createJwt(user.id);
    res.json({
      email: user.email,
      token
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: login"
    });
  }
};
module.exports = { register, login };
