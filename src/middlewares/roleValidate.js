const User = require("../api/users/user.model");
const Role = require("../api/roles/role.model");

const isAdminRole = async (req, res, next) => {
  if (!req.user) {
    res.status(500).json({
      msg: "error user token "
    });
  }

  const user = await User.findByPk(req.user.id, {
    include: [{ model: Role, as: "Roles", attributes: ["name"] }]
  });

  const roles = await user.getRoles();

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(401).json({ message: "require admin role" });
};

/*  */

const isUserRole = async (req, res, next) => {
  if (!req.user) {
    res.status(500).json({
      msg: "error user token "
    });
  }

  const user = await User.findByPk(req.user.id, {
    include: [{ model: Role, as: "Roles", attributes: ["name"] }]
  });

  const roles = await user.getRoles();
  console.log(roles);
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "user" || "admin") {
      next();
      return;
    }
  }
  return res.status(401).json({ message: "require user role" });
};
module.exports = {
  isAdminRole,
  isUserRole
};
