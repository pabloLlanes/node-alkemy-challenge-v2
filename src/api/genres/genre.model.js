const { Sequelize } = require("sequelize");

const db = require("../../config/db");

const Genre = db.define("Genre", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING
});

module.exports = Genre;
