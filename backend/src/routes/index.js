const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const assetRoutes = require('./assetRoutes');

router.use('/auth', authRoutes);
router.use('/assets', assetRoutes);

module.exports = router;
