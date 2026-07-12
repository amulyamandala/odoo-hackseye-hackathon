const reportService = require("../services/report.service");

exports.getDashboard = async (req, res, next) => {
  try {
    const assetSummary = await reportService.getAssetSummary();
    const bookingStats = await reportService.getBookingStats();
    const maintenanceStats = await reportService.getMaintenanceStats();

    res.status(200).json({
      data: {
        assetSummary,
        bookingStats,
        maintenanceStats,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyDashboard = async (req, res, next) => {
  res.status(501).json({ message: "Not implemented" });
};

exports.getUtilizationReport = async (req, res, next) => {
  res.status(501).json({ message: "Not implemented" });
};

exports.getMaintenanceReport = async (req, res, next) => {
  res.status(501).json({ message: "Not implemented" });
};

exports.getCategoryReport = async (req, res, next) => {
  res.status(501).json({ message: "Not implemented" });
};
