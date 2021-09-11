const { Router } = require("express");
const {
  getAllCharacters,
  getCharacter,
  createCharacter
} = require("./character.controller");

const router = Router();

router.get("/", getAllCharacters);
router.get("/:characterId", getCharacter);

router.post("/", createCharacter);

module.exports = router;
