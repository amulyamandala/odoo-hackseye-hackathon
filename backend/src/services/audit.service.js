const { AuditCycle, AuditRecord, Asset, Employee } = require("../models");

class AuditService {
  async createAuditCycle(data, createdById) {
    return await AuditCycle.create({
      ...data,
      status: "In Progress",
      createdById,
    });
  }

  async getAuditCycles(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;

    return await AuditCycle.findAll({
      where,
      order: [["startDate", "DESC"]],
    });
  }

  async addAuditRecord(data, auditedById) {
    const { auditCycleId, assetId, status, notes } = data;

    const cycle = await AuditCycle.findByPk(auditCycleId);
    if (!cycle) throw new Error("Audit cycle not found");
    if (cycle.status !== "In Progress")
      throw new Error("Cannot add record to a closed audit cycle");

    const record = await AuditRecord.create({
      auditCycleId,
      assetId,
      status,
      notes,
      auditedById,
    });

    return record;
  }

  async getAuditRecords(auditCycleId) {
    return await AuditRecord.findAll({
      where: { auditCycleId },
      include: [
        { model: Asset, attributes: ["id", "name", "serialNumber"] },
        {
          model: Employee,
          as: "auditedBy",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
  }

  async closeAuditCycle(auditCycleId) {
    const cycle = await AuditCycle.findByPk(auditCycleId);
    if (!cycle) throw new Error("Audit cycle not found");

    await cycle.update({
      status: "Completed",
      endDate: new Date(),
    });

    return cycle;
  }
}

module.exports = new AuditService();
