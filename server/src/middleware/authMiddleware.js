/**
 * JWT Authentication Middleware
 * Validates Bearer token and attaches user data to request.
 */
const jwt = require('jsonwebtoken');
const Logger = require('../utils/Logger');

const logger = new Logger('AuthMiddleware');

/**
 * Middleware to verify JWT token from Authorization header.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  logger.debug(`Authorization header present: ${!!authHeader}`);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn(`Missing or invalid Authorization header on ${req.method} ${req.originalUrl}`);
    return res.status(401).json({
      success: false,
      message: 'Access denied. No valid token provided.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.debug(`Token verified for user: ${decoded.userId}`);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(`Token verification failed: ${error.message}`);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please log in again.',
      });
    }

    return res.status(403).json({
      success: false,
      message: 'Invalid token.',
    });
  }
}

module.exports = authMiddleware;
