const { Sequelize } = require("sequelize");

const db = new Sequelize("two", "root", "packard", {
  host: "localhost",
  dialect: "mysql"
});

try {
  db.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = db;
