const { Router } = require("express");
const {
  movieAddCharacter,
  movieAddGenre,
  getAllMovies,
  createMovie
} = require("./movie.controller");

const router = Router();

router.post("/add-genre", movieAddGenre);
router.post("/add-character", movieAddCharacter);
router.get("/", getAllMovies);

router.post("/", createMovie);

module.exports = router;
