/**
 * Global Error Handler Middleware
 * Catches all unhandled errors and returns a structured JSON response.
 */
const Logger = require('../utils/Logger');

const logger = new Logger('ErrorHandler');

/**
 * Express error handling middleware.
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 */
function errorHandler(err, req, res, _next) {
  logger.error(`Unhandled error on ${req.method} ${req.originalUrl}: ${err.message}`);
  logger.error(`Stack: ${err.stack}`);

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}

module.exports = errorHandler;
