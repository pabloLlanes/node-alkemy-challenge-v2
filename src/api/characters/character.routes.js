const { Router } = require("express");
const {
  getAllCharacters,
  getCharacter,
  createCharacter,
  getCharactersByMovie,
  getCharacterByAge,
  getCharacterByName,
  updateCharacter,
  deleteCharacter
} = require("./character.controller");

const router = Router();

router.get("/", getAllCharacters);
router.post("/", createCharacter);
router.get("/name", getCharacterByName);
router.get("/age", getCharacterByAge);
router.get("/movie", getCharactersByMovie);
router.get("/:characterId", getCharacter);
router.put("/:characterId", updateCharacter);
router.delete("/:characterId", deleteCharacter);

module.exports = router;
