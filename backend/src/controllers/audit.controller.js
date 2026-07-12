const auditService = require("../services/audit.service");

exports.createAudit = async (req, res, next) => {
  try {
    const createdById = req.user.id;
    const audit = await auditService.createAuditCycle(req.body, createdById);
    res.status(201).json({ data: audit });
  } catch (error) {
    next(error);
  }
};

exports.getAudits = async (req, res, next) => {
  try {
    const audits = await auditService.getAuditCycles(req.query);
    res.status(200).json({ data: audits });
  } catch (error) {
    next(error);
  }
};

exports.getAuditRecords = async (req, res, next) => {
  try {
    const records = await auditService.getAuditRecords(req.params.id);
    res.status(200).json({ data: records });
  } catch (error) {
    next(error);
  }
};

exports.verifyAuditRecord = async (req, res, next) => {
  try {
    const auditedById = req.user.id;
    const data = { ...req.body, auditCycleId: req.params.id };
    const record = await auditService.addAuditRecord(data, auditedById);
    res.status(201).json({ data: record });
  } catch (error) {
    next(error);
  }
};

exports.closeAudit = async (req, res, next) => {
  try {
    const audit = await auditService.closeAuditCycle(req.params.id);
    res.status(200).json({ data: audit });
  } catch (error) {
    next(error);
  }
};
