const { ActivityLog, Employee } = require("../models");

class ActivityLogService {
  /**
   * Log an activity
   * @param {Object} data - { action, entityType, entityId, details }
   * @param {String} actorId - the employee ID performing the action
   */
  async logActivity(data, actorId) {
    return await ActivityLog.create({
      ...data,
      actorId,
    });
  }

  /**
   * Get all activity logs with optional filtering
   * @param {Object} filters
   */
  async getLogs(filters = {}) {
    const where = {};
    if (filters.action) where.action = filters.action;
    if (filters.entityType) where.entityType = filters.entityType;
    if (filters.entityId) where.entityId = filters.entityId;
    if (filters.actorId) where.actorId = filters.actorId;

    return await ActivityLog.findAll({
      where,
      include: [
        {
          model: Employee,
          as: "actor",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }
}

module.exports = new ActivityLogService();
