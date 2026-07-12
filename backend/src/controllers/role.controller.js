const roleService = require("../services/role.service");

exports.getRoles = async (req, res, next) => {
  try {
    const result = await roleService.getAll();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.getRole = async (req, res, next) => {
  try {
    const result = await roleService.getById(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.createRole = async (req, res, next) => {
  try {
    const result = await roleService.create(req.body);
    res.status(201).json({ message: "Role created successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const result = await roleService.update(req.params.id, req.body);
    res.status(200).json({ message: "Role updated successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.deleteRole = async (req, res, next) => {
  try {
    const result = await roleService.delete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
