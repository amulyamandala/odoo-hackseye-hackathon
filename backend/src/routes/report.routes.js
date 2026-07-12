const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/dashboard/my', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/utilization', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/maintenance', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/categories', (req, res) => res.status(501).json({ message: 'Not implemented' }));

module.exports = router;
