const express = require("express");
const logger = require("morgan");
const db = require("./config/db");
const { configEnv } = require("./config/config");

//routes
const moviesRoutes = require("./api/movies/movie.routes");
const charactersRoutes = require("./api/characters/character.routes");
const usersRoutes = require("./api/users/user.routes");
const genresRoutes = require("./api/genres/genre.routes");
const rolesRoutes = require("./api/roles/role.routes");
const authRoutes = require("./api/auth/auth.routes");

const { initialData } = require("./config/dataInitial");

const app = express();

//initial data db
//initialData();
//db.sync();

app.use(express.json());

app.use(logger("tiny"));

app.use("/api/movies", moviesRoutes);
app.use("/api/characters", charactersRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/auth", authRoutes);

app.listen(configEnv.port, () => {
  console.log("server running on port: " + configEnv.port);
});

module.exports = app;
