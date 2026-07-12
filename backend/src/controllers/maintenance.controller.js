const maintenanceService = require("../services/maintenance.service");

exports.getMaintenanceRequests = async (req, res, next) => {
  try {
    const result = await maintenanceService.getAll();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.getMaintenanceRequest = async (req, res, next) => {
  try {
    const result = await maintenanceService.getById(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.createMaintenanceRequest = async (req, res, next) => {
  try {
    const result = await maintenanceService.create(req.body);
    res.status(201).json({ message: "Maintenance request created successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.updateMaintenanceRequest = async (req, res, next) => {
  try {
    const result = await maintenanceService.update(req.params.id, req.body);
    res.status(200).json({ message: "Maintenance request updated successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.deleteMaintenanceRequest = async (req, res, next) => {
  try {
    const result = await maintenanceService.delete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
