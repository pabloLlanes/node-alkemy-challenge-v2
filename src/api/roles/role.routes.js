const router = require("express").Router();
const {
  getRole,
  getRoles,
  createRole,
  updateRole,
  deleteRole
} = require("./role.controller");

router.get("/", getRoles);
router.get("/:genreId", getRole);
router.post("/", createRole);
router.put("/:genreId", updateRole);
router.delete("/:genreId", deleteRole);

module.exports = router;
