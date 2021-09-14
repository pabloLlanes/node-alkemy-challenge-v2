const { Sequelize } = require("sequelize");

const db = require("../../config/db");
const Character = require("../characters/character.model");
const Genre = require("../genres/genre.model");

const Movie = db.define("Movie", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: Sequelize.STRING,
  imagen: Sequelize.STRING,
  year: Sequelize.INTEGER,
  rank: Sequelize.INTEGER
});

Movie.belongsToMany(Character, { through: "actormovies" });
Character.belongsToMany(Movie, { through: "actormovies" });

Movie.belongsToMany(Genre, { through: "genremovies" });
Genre.belongsToMany(Movie, { through: "genreMovies" });

module.exports = Movie;
