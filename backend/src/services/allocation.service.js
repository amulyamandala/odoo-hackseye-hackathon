const { AssetAllocation, Asset, Employee } = require("../models");

class AllocationService {
  async getAll() {
    return await AssetAllocation.findAll({
      include: [
        { model: Asset, as: 'asset' },
        { model: Employee, as: 'employee', attributes: ['id', 'firstName', 'lastName'] }
      ]
    });
  }

  async getById(id) {
    const allocation = await AssetAllocation.findByPk(id, {
      include: [
        { model: Asset, as: 'asset' },
        { model: Employee, as: 'employee', attributes: ['id', 'firstName', 'lastName'] }
      ]
    });
    if (!allocation) throw new Error("Allocation not found");
    return allocation;
  }

  async create(data) {
    // Check if asset is already allocated and not returned
    const existing = await AssetAllocation.findOne({
      where: { assetId: data.assetId, returnDate: null }
    });
    
    if (existing) {
      throw new Error("Asset is currently allocated to someone else");
    }
    
    const allocation = await AssetAllocation.create({
      ...data,
      allocationDate: new Date(),
      status: 'Active'
    });
    
    // Update Asset status
    await Asset.update({ status: 'Allocated' }, { where: { id: data.assetId } });
    
    return allocation;
  }

  async update(id, data) {
    const allocation = await this.getById(id);
    
    // If the asset is being returned, update the asset status back to Available
    if (data.returnDate && !allocation.returnDate) {
      await Asset.update({ status: 'Available' }, { where: { id: allocation.assetId } });
      data.status = 'Returned';
    }
    
    return await allocation.update(data);
  }

  async delete(id) {
    const allocation = await this.getById(id);
    await allocation.destroy();
    return { message: "Allocation deleted successfully" };
  }
}

module.exports = new AllocationService();
