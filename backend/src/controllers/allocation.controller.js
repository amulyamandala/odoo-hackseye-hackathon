const allocationService = require("../services/allocation.service");

exports.getAllocations = async (req, res, next) => {
  try {
    const result = await allocationService.getAll();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.getAllocation = async (req, res, next) => {
  try {
    const result = await allocationService.getById(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.createAllocation = async (req, res, next) => {
  try {
    const result = await allocationService.create(req.body);
    res.status(201).json({ message: "Allocation created successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.updateAllocation = async (req, res, next) => {
  try {
    const result = await allocationService.update(req.params.id, req.body);
    res.status(200).json({ message: "Allocation updated successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.deleteAllocation = async (req, res, next) => {
  try {
    const result = await allocationService.delete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
