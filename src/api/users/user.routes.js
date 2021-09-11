const router = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require("./user.controller");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post(
  "/",

  createUser
);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
