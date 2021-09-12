const { Sequelize } = require("sequelize");

const db = require("../../config/db");

const bcrypt = require("bcryptjs");

const Role = require("../roles/role.model");

const User = db.define("User", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  email: Sequelize.STRING,
  nickname: Sequelize.STRING,
  password: Sequelize.STRING
});

User.belongsToMany(Role, { through: "userrole" });
Role.belongsToMany(User, { through: "userrole" });

async function initialUsers() {
  const users = await User.count();

  if (users > 0) {
    return;
  }
  const passwordHash = bcrypt.hashSync("123456", 8);

  await User.create({
    email: "admin@admin.com",
    nickname: "admin",
    password: passwordHash
  });
}
module.exports = { User, initialUsers };
