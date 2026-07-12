const express = require('express');
const router = express.Router();

router.post('/', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/:id/records', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.patch('/:id/verify', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.patch('/:id/close', (req, res) => res.status(501).json({ message: 'Not implemented' }));

module.exports = router;
