const { Sequelize } = require("sequelize");

const db = require("../../config/db");

const Role = db.define("Role", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING
});

module.exports = Role;
