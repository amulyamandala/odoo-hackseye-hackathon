const express = require('express');
const router = express.Router();

// Public routes
router.post('/register', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.post('/login', (req, res) => res.status(501).json({ message: 'Not implemented' }));

// Protected routes
router.get('/me', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.put('/change-password', (req, res) => res.status(501).json({ message: 'Not implemented' }));

module.exports = router;
