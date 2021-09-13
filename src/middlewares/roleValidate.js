const User = require("../api/users/user.model");
const Role = require("../api/roles/role.model");

const isAdminRole = async (req, res, next) => {
  if (!req.user) {
    console.log(req.user);
    return res.status(500).json({
      msg: "error user token "
    });
  }

  const user = await User.findByPk(req.user.id, {
    include: [{ model: Role, as: "Roles", attributes: ["name"] }]
  });

  const roles = await user.getRoles();

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      console.log("unauthorize");
      next();
    }
  }
  res.status(401).json({
    msg: ` is not a administrator!`
  });
};

module.exports = {
  isAdminRole
};
