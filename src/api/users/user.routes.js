const router = require("express").Router();
const { check } = require("express-validator");

const { inputsValidate, verifyJwt, isAdminRole } = require("../../middlewares");

const { verifyDuplicateEmail } = require("../../helpers/dbValidators");

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
router.post("/add-role", verifyJwt, userAddRole);

router.post(
  "/",
  verifyJwt,
  isAdminRole,
  [
    check("nickname", "name is required, min:2 ").isLength({ min: 2, max: 20 }),
    check("email", "email is required").isEmail(),
    check("email").custom(verifyDuplicateEmail),
    check("password", "min: 6 ").isLength({ min: 2, max: 20 }),
    inputsValidate
  ],
  createUser
);
router.put("/:userId", verifyJwt, updateUser);
router.delete("/:userId", verifyJwt, deleteUser);

module.exports = router;
