const express = require('express');
const router = express.Router();

router.post('/', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/lookup', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/:id', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.put('/:id', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.patch('/:id/condition', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.patch('/:id/decommission', (req, res) => res.status(501).json({ message: 'Not implemented' }));

module.exports = router;
