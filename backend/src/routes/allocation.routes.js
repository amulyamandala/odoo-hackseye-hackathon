const express = require('express');
const router = express.Router();
const allocationController = require('../controllers/allocation.controller');

router.post('/', allocationController.createAllocation);
router.get('/', allocationController.getAllocations);
router.get('/:id', allocationController.getAllocation);
router.put('/:id', allocationController.updateAllocation);
router.delete('/:id', allocationController.deleteAllocation);

module.exports = router;