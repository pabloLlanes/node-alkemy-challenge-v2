const Movie = require("./movie.model");
const Genre = require("../genres/genre.model");
const Character = require("../characters/character.model");

//movie add genre
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

//get all movies
const getAllMovies = async (req, res) => {
  const movies = await Movie.findAll();

  res.json(movies);
};

//create movie
const createMovie = async (req, res) => {
  try {
    const { title, imagen, year, rank } = req.body;
    const movie = await Movie.create({ title, imagen, year, rank });
    res.json(movie);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: create movie"
    });
  }
};

//update movie
const updateMovie = async (req, res) => {
  try {
    const { title, imagen, year, rank } = req.body;
    const { movieId } = req.params;
    await Movie.update(
      {
        title,
        imagen,
        year,
        rank
      },
      { where: { id: movieId } }
    );
    res.json({ msg: "update ok" });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: update movie"
    });
  }
};

//delete movie
const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    await Movie.destroy({ where: { id: movieId } });
    res.json({ msg: "delete ok" });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: delete movie"
    });
  }
};

module.exports = {
  movieAddGenre,
  movieAddCharacter,
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie
};
