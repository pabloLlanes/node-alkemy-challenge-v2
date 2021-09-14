const router = require("express").Router();
const { check } = require("express-validator");

const {
  inputsValidate,
  verifyJwt,
  isAdminRole,
  isUserRole
} = require("../../middlewares");

const { verifyDuplicateEmail } = require("../../helpers/dbValidators");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  userAddRole
} = require("./user.controller");

router.get("/", verifyJwt, isUserRole, getUsers);
router.get("/:userId", verifyJwt, isUserRole, getUser);
router.post("/add-role", verifyJwt, isAdminRole, userAddRole);

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
router.put("/:userId", verifyJwt, isAdminRole, updateUser);
router.delete("/:userId", verifyJwt, isAdminRole, deleteUser);

module.exports = router;
