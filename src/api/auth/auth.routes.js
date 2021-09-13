const { Router } = require("express");
const { check } = require("express-validator");

const { register, login } = require("./auth.controller");

const { verifyDuplicateEmail } = require("../../helpers/dbValidators");

const { inputsValidate } = require("../../middlewares");

const router = Router();

router.post(
  "/register",
  [
    check("nickname", "name is required, min:2 ").isLength({ min: 2, max: 20 }),
    check("email", "email is required").isEmail(),
    check("email").custom(verifyDuplicateEmail),
    check("password", "min: 6 ").isLength({ min: 2, max: 20 }),
    inputsValidate
  ],
  register
);
router.post("/login", login);

module.exports = router;
