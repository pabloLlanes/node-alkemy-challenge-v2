require("dotenv").config();

const configEnv = {
  port: process.env.PORT || 4000,

  host: process.env.HOST || "localhost",
  dialect: process.env.DIALECT || "mysql",

  dbName: process.env.DBNAME || "dbmovies",
  dbUser: process.env.DBUSER || "root",

  dbPass: process.env.DBPASSWORD || "packard",
  dbJwtSecret: process.env.JWT_TOP_SECRET || "topsecret",

  emailUser: process.env.EMAIL_USER || "",
  emailPass: process.env.EMAIL_PASS || ""
};

module.exports = { configEnv };
