require("dotenv").config();

const configEnv = {
  port: process.env.PORT || 4000,

  host: process.env.HOST || "localhost",
  dialect: process.env.DIALECT || "mysql",

  dbName: process.env.DBNAME || "dbmovies",
  dbUser: process.env.DBUSER || "root",

  dbPass: process.env.DBPASSWORD || "root",
  dbJwtSecret: process.env.JWT_TOP_SECRET || "topsecret"
};

module.exports = { configEnv };
