const express = require('express');
const router = express.Router();

router.get('/my', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.patch('/:id/read', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.patch('/read-all', (req, res) => res.status(501).json({ message: 'Not implemented' }));

module.exports = router;
