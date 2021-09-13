const jwt = require("jsonwebtoken");

const User = require("../api/users/user.model");
const { configEnv } = require("../config/config");

const verifyJwt = async (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) {
    return res.status(401).json({ msg: "unauthorize, token is required" });
  }
  const { userId } = jwt.verify(token, configEnv.dbJwtSecret);

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(401).json({ msg: "user not encountered" });
  }

  req.user = user;

  next();
};

module.exports = { verifyJwt };
