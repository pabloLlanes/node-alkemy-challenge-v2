const Movie = require("./movie.model");
const Genre = require("../genres/genre.model");
const Character = require("../characters/character.model");

const movieAddGenre = async (req, res) => {
  const movieFound = await Movie.findByPk(req.body.movieId);
  if (!movieFound) {
    return res.json({ msg: "movie id not encountered" });
  }

  const genreFound = await Genre.findByPk(req.body.genreId);

  if (!genreFound) {
    return res.json({ msg: "Genre id not encountered" });
  }

  await movieFound.addGenre(genreFound);

  res.json(` ${movieFound.title} is genre: ${genreFound.name} now`);
};

// movie add character
const movieAddCharacter = async (req, res) => {
  const movieFound = await Movie.findByPk(req.body.movieId);
  if (!movieFound) {
    return res.json({ msg: "movie id not encountered" });
  }

  const characterFound = await Character.findByPk(req.body.characterId);
  if (!characterFound) {
    return res.json({ msg: "Character id not encountered" });
  }

  await movieFound.addCharacter(characterFound);

  res.json(`${characterFound.name} jobs on movie: ${movieFound.title}`);
};

const getAllMovies = async (req, res) => {
  const movies = await Movie.findAll();

  res.json(movies);
};

const createMovie = async (req, res) => {
  const { title, year } = req.body;
  const movie = await Movie.create({ title, year });
  res.json(movie);
};

module.exports = {
  movieAddGenre,
  movieAddCharacter,
  getAllMovies,
  createMovie
};
