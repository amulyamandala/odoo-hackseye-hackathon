const { TransferRequest, Asset, Employee, Department } = require("../models");

class TransferService {
  async getAll() {
    return await TransferRequest.findAll({
      include: [
        { model: Asset, as: 'asset' },
        { model: Employee, as: 'requester', attributes: ['id', 'firstName', 'lastName'] },
        { model: Department, as: 'fromDepartment' },
        { model: Department, as: 'toDepartment' }
      ]
    });
  }

  async getById(id) {
    const transfer = await TransferRequest.findByPk(id, {
      include: [
        { model: Asset, as: 'asset' },
        { model: Employee, as: 'requester', attributes: ['id', 'firstName', 'lastName'] },
        { model: Department, as: 'fromDepartment' },
        { model: Department, as: 'toDepartment' }
      ]
    });
    if (!transfer) throw new Error("Transfer request not found");
    return transfer;
  }

  async create(data) {
    const transfer = await TransferRequest.create({
      ...data,
      status: 'Pending',
      requestDate: new Date()
    });
    return transfer;
  }

  async update(id, data) {
    const transfer = await this.getById(id);
    
    // If approved, you would normally trigger asset location updates here
    if (data.status === 'Approved' && transfer.status !== 'Approved') {
      data.approvalDate = new Date();
      // await Asset.update({ departmentId: transfer.toDepartmentId }, { where: { id: transfer.assetId } });
    }
    
    return await transfer.update(data);
  }

  async delete(id) {
    const transfer = await this.getById(id);
    await transfer.destroy();
    return { message: "Transfer request deleted successfully" };
  }
}

module.exports = new TransferService();
