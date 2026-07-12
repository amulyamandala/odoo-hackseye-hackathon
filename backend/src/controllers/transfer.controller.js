const transferService = require("../services/transfer.service");

exports.getTransfers = async (req, res, next) => {
  try {
    const result = await transferService.getAll();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.getTransfer = async (req, res, next) => {
  try {
    const result = await transferService.getById(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.createTransfer = async (req, res, next) => {
  try {
    const result = await transferService.create(req.body);
    res.status(201).json({ message: "Transfer request created successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.updateTransfer = async (req, res, next) => {
  try {
    const result = await transferService.update(req.params.id, req.body);
    res.status(200).json({ message: "Transfer request updated successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.deleteTransfer = async (req, res, next) => {
  try {
    const result = await transferService.delete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
