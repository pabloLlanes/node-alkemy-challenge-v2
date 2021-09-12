const isAdminRole = (req, res, next) => {
  if (!req.user) {
    console.log(req.user);
    return res.status(500).json({
      msg: "error user token "
    });
  }
  console.log(req.user);

  const { role, email } = req.user;

  if (role !== "admin") {
    return res.status(401).json({
      msg: `${email} is not a administrator!`
    });
  }
  next();
};

module.exports = {
  isAdminRole
};
