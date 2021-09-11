const Genre = require("./genre.model");

const getGenre = async (req, res) => {
  const genre = await Genre.findByPk(req.params.genreId, {
    include: [{ model: Movie, as: "Movies" }]
  });
  if (!genre) {
    return res.json({ msg: "genre id not encountered" });
  }

  res.status(200).json(genre);
};

const getGenres = async (_, res) => {
  const genres = await Genre.findAll({
    include: [{ model: Movie, as: "Movies", attributes: ["title"] }]
  });
  res.status(200).json(genres);
};

const createGenre = async (req, res) => {
  const genre = await Genre.create(req.body);
  res.json(genre);
};

const updateGenre = async (req, res) => {
  await Genre.update(req.body, { where: { id: req.params.genreId } });
  res.json({ msg: "update ok" });
};

const deleteGenre = async (req, res) => {
  await Genre.destroy({ where: { id: req.params.genreId } });
  res.json({ msg: "delete ok" });
};

module.exports = {
  getGenre,
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre
};
