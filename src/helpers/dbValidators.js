const User = require("../api/users/user.model");

//verify if duplicate email
const verifyDuplicateEmail = async (email = "") => {
  const VerifyEmail = await User.findOne({ where: { email } });
  if (VerifyEmail) {
    throw new Error(`${email} email has already been registered`);
  }
};

//verify user by id
const verifyUserById = async (id) => {
  const VerifyUser = await User.findById(id);

  if (!VerifyUser) {
    throw new Error(`id: ${id} dont exist `);
  }
};

module.exports = { verifyDuplicateEmail, verifyUserById };
