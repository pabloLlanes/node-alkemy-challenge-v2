const Character = require("./character.model");
const Movie = require("../movies/movie.model");

//all characters
const getAllCharacters = async (req, res) => {
  const characters = await Character.findAll();

  res.json(characters);
};

//single character
const getCharacter = async (req, res) => {
  const character = await Character.findByPk(req.params.characterId, {
    include: [{ model: Movie, as: "Movies" }]
  });
  if (!character) {
    return res.json({ msg: "movie id not encountered" });
  }

  res.status(200).json(character);
};

//create character
const createCharacter = async (req, res) => {
  const { name, age } = req.body;

  const character = await Character.create({ name, age });
  res.json(character);
};

module.exports = { getAllCharacters, getCharacter, createCharacter };
