const express = require('express');
const router = express.Router();

router.post('/', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.patch('/:id/return', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/asset/:assetId', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/employee/:empId', (req, res) => res.status(501).json({ message: 'Not implemented' }));

module.exports = router;
