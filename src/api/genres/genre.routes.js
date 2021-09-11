const router = require("express").Router();
const {
  getGenre,
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre
} = require("./genre.controller");

router.get("/", getGenres);
router.get("/:genreId", getGenre);
router.post("/", createGenre);
router.put("/:genreId", updateGenre);
router.delete("/:genreId", deleteGenre);

module.exports = router;
