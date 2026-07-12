const departmentService = require("../services/department.service");

exports.getDepartments = async (req, res, next) => {
  try {
    const result = await departmentService.getAll();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.getDepartment = async (req, res, next) => {
  try {
    const result = await departmentService.getById(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.createDepartment = async (req, res, next) => {
  try {
    const result = await departmentService.create(req.body);
    res.status(201).json({ message: "Department created successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const result = await departmentService.update(req.params.id, req.body);
    res.status(200).json({ message: "Department updated successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const result = await departmentService.delete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
