const { Router } = require("express");

const { verifyJwt, isAdminRole, isUserRole } = require("../../middlewares");

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
router.post("/", verifyJwt, isUserRole, createCharacter);
router.get("/name", getCharacterByName);
router.get("/age", getCharacterByAge);
router.get("/movie", getCharactersByMovie);
router.get("/:characterId", verifyJwt, isUserRole, getCharacter);
router.put("/:characterId", verifyJwt, isUserRole, updateCharacter);
router.delete("/:characterId", verifyJwt, isUserRole, deleteCharacter);

module.exports = router;
