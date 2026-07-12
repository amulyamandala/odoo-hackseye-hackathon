const activityLogService = require("../services/activityLog.service");

exports.getLogs = async (req, res, next) => {
  try {
    const logs = await activityLogService.getLogs(req.query);
    res.status(200).json({ data: logs });
  } catch (error) {
    next(error);
  }
};

exports.getLogsByEntity = async (req, res, next) => {
  try {
    const logs = await activityLogService.getLogs({
      entityType: req.params.entityType,
      entityId: req.params.entityId,
    });
    res.status(200).json({ data: logs });
  } catch (error) {
    next(error);
  }
};
