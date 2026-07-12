const employeeService = require("../services/employee.service");

exports.getEmployees = async (req, res, next) => {
  try {
    const result = await employeeService.getAll();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.getEmployee = async (req, res, next) => {
  try {
    const result = await employeeService.getById(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const result = await employeeService.create(req.body);
    res.status(201).json({ message: "Employee created successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const result = await employeeService.update(req.params.id, req.body);
    res.status(200).json({ message: "Employee updated successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const result = await employeeService.delete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
