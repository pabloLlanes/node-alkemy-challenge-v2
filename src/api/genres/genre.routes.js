const router = require("express").Router();
const {
  getGenre,
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre
} = require("./genre.controller");

const { verifyJwt, isUserRole } = require("../../middlewares");

router.get("/", getGenres);
router.get("/:genreId", getGenre);
router.post("/", verifyJwt, isUserRole, createGenre);
router.put("/:genreId", verifyJwt, isUserRole, updateGenre);
router.delete("/:genreId", verifyJwt, isUserRole, deleteGenre);

module.exports = router;
