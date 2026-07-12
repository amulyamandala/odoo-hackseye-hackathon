const express = require('express');
const router = express.Router();

router.post('/', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/my', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.patch('/:id/assign', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.patch('/:id/resolve', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.patch('/:id/reject', (req, res) => res.status(501).json({ message: 'Not implemented' }));

module.exports = router;
