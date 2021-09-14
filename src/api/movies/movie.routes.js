const { Router } = require("express");
const {
  movieAddCharacter,
  movieAddGenre,
  getAllMovies,
  createMovie
} = require("./movie.controller");

const { verifyJwt, isUserRole } = require("../../middlewares");

const router = Router();

router.post("/add-genre", movieAddGenre);
router.post("/add-character", movieAddCharacter);
router.get("/", getAllMovies);

router.post("/", verifyJwt, isUserRole, createMovie);

module.exports = router;
