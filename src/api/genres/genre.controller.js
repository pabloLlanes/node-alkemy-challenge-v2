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

//create genre
const createGenre = async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.json(genre);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: create user"
    });
  }
};

//update enre
const updateGenre = async (req, res) => {
  try {
    await Genre.update(req.body, { where: { id: req.params.genreId } });
    res.json({ msg: "update ok" });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: update user"
    });
  }
};

//delete genre
const deleteGenre = async (req, res) => {
  try {
    await Genre.destroy({ where: { id: req.params.genreId } });
    res.json({ msg: "delete ok" });
  } catch (error) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: delete user"
    });
  }
};

module.exports = {
  getGenre,
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre
};
