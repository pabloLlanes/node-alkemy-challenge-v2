const Role = require("./role.model");

const getRole = async (req, res) => {
  const genre = await Role.findByPk(req.params.roleId, {});
  if (!genre) {
    return res.json({ msg: "genre id not encountered" });
  }

  res.status(200).json(genre);
};

const getRoles = async (_, res) => {
  const roles = await Role.findAll({});
  res.status(200).json(roles);
};

const createRole = async (req, res) => {
  const genre = await Role.create(req.body);
  res.json(genre);
};

const updateRole = async (req, res) => {
  await Role.update(req.body, { where: { id: req.params.roleId } });
  res.json({ msg: "update ok" });
};

const deleteRole = async (req, res) => {
  await Role.destroy({ where: { id: req.params.roleId } });
  res.json({ msg: "delete ok" });
};

module.exports = {
  getRole,
  getRoles,
  createRole,
  updateRole,
  deleteRole
};
