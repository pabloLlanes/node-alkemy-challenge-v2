const { Sequelize } = require("sequelize");

const db = require("../../config/db");

const User = db.define("User", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  email: Sequelize.STRING,
  nickname: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.STRING
});

module.exports = User;
