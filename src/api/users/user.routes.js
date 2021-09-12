const router = require("express").Router();

const { inputsValidate, verifyJwt, isAdminRole } = require("../../middlewares");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  userAddRole
} = require("./user.controller");

router.get("/", verifyJwt, getUsers);
router.get("/:userId", verifyJwt, getUser);
router.post("/add-role", [verifyJwt, isAdminRole], userAddRole);

router.post("/", verifyJwt, createUser);
router.put("/:userId", verifyJwt, updateUser);
router.delete("/:userId", verifyJwt, deleteUser);

module.exports = router;
