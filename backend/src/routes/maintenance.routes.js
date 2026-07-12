const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenance.controller');

router.post('/', maintenanceController.createMaintenanceRequest);
router.get('/', maintenanceController.getMaintenanceRequests);
router.get('/:id', maintenanceController.getMaintenanceRequest);
router.put('/:id', maintenanceController.updateMaintenanceRequest);
router.delete('/:id', maintenanceController.deleteMaintenanceRequest);

module.exports = router;