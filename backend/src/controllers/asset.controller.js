const assetService = require("../services/asset.service");

exports.createAsset = async (req, res, next) => {
  try {
    const asset = await assetService.createAsset(req.body);
    res.status(201).json({ message: "Asset created", data: asset });
  } catch (error) {
    next(error);
  }
};

exports.getAssets = async (req, res, next) => {
  try {
    const assets = await assetService.getAssets(req.query);
    res.status(200).json({ data: assets });
  } catch (error) {
    next(error);
  }
};

exports.lookupAsset = async (req, res, next) => {
  try {
    const asset = await assetService.lookupAsset(req.query.serialNumber);
    res.status(200).json({ data: asset });
  } catch (error) {
    next(error);
  }
};

exports.getAssetById = async (req, res, next) => {
  try {
    const asset = await assetService.getAssetById(req.params.id);
    res.status(200).json({ data: asset });
  } catch (error) {
    next(error);
  }
};

exports.updateAsset = async (req, res, next) => {
  try {
    const asset = await assetService.updateAsset(req.params.id, req.body);
    res.status(200).json({ message: "Asset updated", data: asset });
  } catch (error) {
    next(error);
  }
};

exports.updateAssetCondition = async (req, res, next) => {
  try {
    const { condition, notes } = req.body;
    const asset = await assetService.updateAssetCondition(
      req.params.id,
      condition,
      notes,
    );
    res.status(200).json({ message: "Asset condition updated", data: asset });
  } catch (error) {
    next(error);
  }
};

exports.decommissionAsset = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const asset = await assetService.decommissionAsset(req.params.id, reason);
    res.status(200).json({ message: "Asset decommissioned", data: asset });
  } catch (error) {
    next(error);
  }
};
