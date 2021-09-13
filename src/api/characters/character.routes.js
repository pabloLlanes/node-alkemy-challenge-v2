const { Router } = require("express");

const { verifyJwt, isAdminRole } = require("../../middlewares");

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

router.get("/", verifyJwt, isAdminRole, getAllCharacters);
router.post("/", createCharacter);
router.get("/name", getCharacterByName);
router.get("/age", getCharacterByAge);
router.get("/movie", getCharactersByMovie);
router.get("/:characterId", getCharacter);
router.put("/:characterId", verifyJwt, isAdminRole, updateCharacter);
router.delete("/:characterId", deleteCharacter);

module.exports = router;
