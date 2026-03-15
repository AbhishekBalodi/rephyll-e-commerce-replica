/**
 * Request Logger Middleware
 * Logs every incoming request with method, URL, IP, and response time.
 */
const Logger = require('../utils/Logger');

const logger = new Logger('RequestLogger');

/**
 * Middleware function to log incoming HTTP requests.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function requestLogger(req, res, next) {
  const startTime = Date.now();
  const { method, originalUrl, ip } = req;

  logger.info(`→ ${method} ${originalUrl} from ${ip}`);

  // Log response on finish
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const { statusCode } = res;
    const level = statusCode >= 400 ? 'warn' : 'info';

    logger[level](`← ${method} ${originalUrl} ${statusCode} (${duration}ms)`);
  });

  next();
}

module.exports = requestLogger;
