const { Sequelize } = require("sequelize");

const db = require("../../config/db");

const Character = db.define("Character", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  imagen: Sequelize.STRING,
  age: Sequelize.INTEGER,
  history: Sequelize.STRING,
  weight: Sequelize.INTEGER
});

module.exports = Character;
