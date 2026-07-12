const { MaintenanceRequest, Asset, Employee } = require("../models");

class MaintenanceService {
  async getAll() {
    return await MaintenanceRequest.findAll({
      include: [
        { model: Asset, as: 'asset' },
        { model: Employee, as: 'reporter', attributes: ['id', 'firstName', 'lastName'] }
      ]
    });
  }

  async getById(id) {
    const request = await MaintenanceRequest.findByPk(id, {
      include: [
        { model: Asset, as: 'asset' },
        { model: Employee, as: 'reporter', attributes: ['id', 'firstName', 'lastName'] }
      ]
    });
    if (!request) throw new Error("Maintenance request not found");
    return request;
  }

  async create(data) {
    const request = await MaintenanceRequest.create({
      ...data,
      status: 'Open'
    });
    
    // Automatically set asset to 'Under Maintenance'
    await Asset.update({ status: 'Under Maintenance' }, { where: { id: data.assetId } });
    
    return request;
  }

  async update(id, data) {
    const request = await this.getById(id);
    
    // If completed, set asset back to 'Available'
    if (data.status === 'Completed' && request.status !== 'Completed') {
      data.completionDate = new Date();
      await Asset.update({ status: 'Available' }, { where: { id: request.assetId } });
    }
    
    return await request.update(data);
  }

  async delete(id) {
    const request = await this.getById(id);
    await request.destroy();
    return { message: "Maintenance request deleted successfully" };
  }
}

module.exports = new MaintenanceService();
