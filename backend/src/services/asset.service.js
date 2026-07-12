const { Asset, AssetCategory } = require("../models");

class AssetService {
  async createAsset(data) {
    // Basic validation could go here
    const existingAsset = await Asset.findOne({
      where: { serialNumber: data.serialNumber },
    });
    if (existingAsset) {
      throw new Error("Asset with this serial number already exists");
    }

    const asset = await Asset.create({
      ...data,
      status: "Available", // default state
    });

    return asset;
  }

  async getAssets(filters = {}) {
    // Construct sequelize where clause based on filters
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.condition) where.condition = filters.condition;

    return await Asset.findAll({
      where,
      include: [{ model: AssetCategory }],
    });
  }

  async getAssetById(id) {
    const asset = await Asset.findByPk(id, {
      include: [{ model: AssetCategory }],
    });

    if (!asset) throw new Error("Asset not found");
    return asset;
  }

  async lookupAsset(serialNumber) {
    const asset = await Asset.findOne({
      where: { serialNumber },
      include: [{ model: AssetCategory }],
    });

    if (!asset) throw new Error("Asset not found");
    return asset;
  }

  async updateAsset(id, data) {
    const asset = await this.getAssetById(id);

    // Prevent updating serial number if it belongs to someone else
    if (data.serialNumber && data.serialNumber !== asset.serialNumber) {
      const existing = await Asset.findOne({
        where: { serialNumber: data.serialNumber },
      });
      if (existing) throw new Error("Serial number already in use");
    }

    await asset.update(data);
    return asset;
  }

  async updateAssetCondition(id, condition, notes) {
    const asset = await this.getAssetById(id);

    // Could track notes in a separate audit or log here
    await asset.update({ condition });
    return asset;
  }

  async decommissionAsset(id, reason) {
    const asset = await this.getAssetById(id);

    if (
      ["Allocated", "In Maintenance", "Transfer Pending"].includes(asset.status)
    ) {
      throw new Error(
        `Cannot decommission asset currently in status: ${asset.status}`,
      );
    }

    await asset.update({
      status: "Decommissioned",
      isBookable: false,
      // could also log the reason in ActivityLog
    });

    return asset;
  }
}

module.exports = new AssetService();
