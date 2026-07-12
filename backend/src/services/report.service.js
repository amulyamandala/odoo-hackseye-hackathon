const {
  Asset,
  ResourceBooking,
  MaintenanceRequest,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

class ReportService {
  /**
   * Get an overall summary of assets
   */
  async getAssetSummary() {
    const totalAssets = await Asset.count();
    const available = await Asset.count({ where: { status: "Available" } });
    const inMaintenance = await Asset.count({
      where: { status: "In Maintenance" },
    });
    const allocated = await Asset.count({ where: { status: "Allocated" } });
    const decommissioned = await Asset.count({
      where: { status: "Decommissioned" },
    });

    return {
      totalAssets,
      available,
      inMaintenance,
      allocated,
      decommissioned,
    };
  }

  /**
   * Get booking trends or statistics
   */
  async getBookingStats() {
    const totalBookings = await ResourceBooking.count();
    const pendingBookings = await ResourceBooking.count({
      where: { status: "Pending" },
    });
    const activeBookings = await ResourceBooking.count({
      where: { status: "Active" },
    });

    return {
      totalBookings,
      pendingBookings,
      activeBookings,
    };
  }

  /**
   * Get maintenance cost or time summary (placeholder for future advanced aggregations)
   */
  async getMaintenanceStats() {
    const totalRequests = await MaintenanceRequest.count();
    const resolved = await MaintenanceRequest.count({
      where: { status: "Resolved" },
    });

    return {
      totalRequests,
      resolved,
      resolutionRate:
        totalRequests > 0
          ? ((resolved / totalRequests) * 100).toFixed(2) + "%"
          : "0%",
    };
  }
}

module.exports = new ReportService();
