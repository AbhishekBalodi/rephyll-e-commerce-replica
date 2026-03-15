/**
 * Request Validation Middleware Factory
 * Creates middleware that validates request body against a schema object.
 */
const validator = require('validator');
const Logger = require('../utils/Logger');

const logger = new Logger('ValidateRequest');

/**
 * Sanitize a string input: trim, escape HTML entities.
 * @param {string} value
 * @returns {string}
 */
function sanitizeString(value) {
  if (typeof value !== 'string') return '';
  return validator.trim(validator.escape(value));
}

/**
 * Factory: creates validation middleware for a given set of rules.
 * @param {Array<{field: string, type: string, required: boolean, maxLength?: number, minLength?: number}>} rules
 * @returns {import('express').RequestHandler}
 */
function validateRequest(rules) {
  return (req, res, next) => {
    const errors = [];

    logger.debug(`Validating request body with ${rules.length} rules.`);
    logger.debug(`Body keys: ${Object.keys(req.body || {}).join(', ')}`);

    for (const rule of rules) {
      const value = req.body[rule.field];

      // Required check
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.push(`${rule.field} is required.`);
        logger.debug(`Validation failed: ${rule.field} is required but missing.`);
        continue;
      }

      if (value === undefined || value === null || value === '') continue;

      // Type check
      if (rule.type === 'email' && !validator.isEmail(String(value))) {
        errors.push(`${rule.field} must be a valid email address.`);
        logger.debug(`Validation failed: ${rule.field} is not a valid email.`);
      }

      if (rule.type === 'string' && typeof value !== 'string') {
        errors.push(`${rule.field} must be a string.`);
        logger.debug(`Validation failed: ${rule.field} is not a string.`);
      }

      // Length checks
      if (rule.maxLength && String(value).length > rule.maxLength) {
        errors.push(`${rule.field} must be at most ${rule.maxLength} characters.`);
        logger.debug(`Validation failed: ${rule.field} exceeds maxLength ${rule.maxLength}.`);
      }

      if (rule.minLength && String(value).length < rule.minLength) {
        errors.push(`${rule.field} must be at least ${rule.minLength} characters.`);
        logger.debug(`Validation failed: ${rule.field} below minLength ${rule.minLength}.`);
      }
    }

    if (errors.length > 0) {
      logger.warn(`Validation errors: ${JSON.stringify(errors)}`);
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors,
      });
    }

    // Sanitize string fields
    for (const rule of rules) {
      if (req.body[rule.field] && (rule.type === 'string' || rule.type === 'email')) {
        req.body[rule.field] = sanitizeString(String(req.body[rule.field]));
      }
    }

    logger.debug('Validation passed. Request body sanitized.');
    next();
  };
}

module.exports = { validateRequest, sanitizeString };
