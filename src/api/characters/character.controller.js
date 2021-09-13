const Character = require("./character.model");
const Movie = require("../movies/movie.model");

//all characters
const getAllCharacters = async (_, res) => {
  try {
    const characters = await Character.findAll();

    res.json(characters);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: get all characters"
    });
  }
};

//single character
const getCharacter = async (req, res) => {
  try {
    const character = await Character.findByPk(req.params.characterId, {
      include: [{ model: Movie, as: "Movies" }]
    });
    if (!character) {
      return res.json({ msg: "movie id not encountered" });
    }

    res.status(200).json(character);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: get a single character"
    });
  }
};

//create character
const createCharacter = async (req, res) => {
  try {
    const { name, imagen, age, weight, history } = req.body;

    const character = await Character.create({
      name,
      imagen,
      age,
      weight,
      history
    });
    res.json(character);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: create character"
    });
  }
};

//get character by movie
const getCharactersByMovie = async (req, res) => {
  try {
    const MovieId = req.query.movie;

    const characters = await Movie.findByPk(MovieId, {
      include: [{ model: Character, as: "Characters" }]
    });

    if (!characters) {
      return res.json({ msg: "movie  not encountered" });
    }

    res.status(200).json({ movie: characters });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: get Characters By Movie"
    });
  }
};

//get character by age

const getCharacterByAge = async (req, res) => {
  try {
    const age = req.query.age;

    const character = await Character.findOne({
      where: { age }
    });
    if (!character) {
      return res.json({ msg: "character age not encountered" });
    }

    res.status(200).json({ character: character });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: get Characters By Movie"
    });
  }
};
//get character by name
const getCharacterByName = async (req, res) => {
  try {
    const name = req.query.name;

    const character = await Character.findOne({
      where: { name }
    });
    if (!character) {
      return res.json({ msg: "character name not encountered" });
    }

    res.status(200).json({ character: character });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: get Characters By Name"
    });
  }
};

//update character
const updateCharacter = async (req, res) => {
  try {
    const { name, imagen, age, weight, history } = req.body;

    await Character.update(
      {
        name,
        imagen,
        age,
        weight,
        history
      },
      { where: { id: req.params.characterId } }
    );
    res.json({ msg: "update ok" });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: update character"
    });
  }
};

//delete charaacter
const deleteCharacter = async (req, res) => {
  try {
    await Character.destroy({ where: { id: req.params.characterId } });
    res.json({ msg: "delete ok" });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: delete character"
    });
  }
};
module.exports = {
  getAllCharacters,
  getCharacter,
  createCharacter,
  getCharactersByMovie,
  getCharacterByAge,
  getCharacterByName,
  updateCharacter,
  deleteCharacter
};
