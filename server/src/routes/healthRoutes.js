/**
 * Health Check Routes - /api/health
 */
const express = require('express');
const Logger = require('../utils/Logger');

const router = express.Router();
const logger = new Logger('HealthRoute');

router.get('/', (req, res) => {
  logger.info('Health check requested.');
  res.status(200).json({
    success: true,
    message: 'rePhyl API is running.',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

module.exports = router;
