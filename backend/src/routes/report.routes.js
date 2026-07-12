const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');

router.get('/dashboard', reportController.getDashboard);
router.get('/dashboard/my', reportController.getMyDashboard);
router.get('/utilization', reportController.getUtilizationReport);
router.get('/maintenance', reportController.getMaintenanceReport);
router.get('/categories', reportController.getCategoryReport);

module.exports = router;
