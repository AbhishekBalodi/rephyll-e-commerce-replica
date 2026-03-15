/**
 * Logger utility class for structured console logging.
 * Provides consistent formatting with timestamps and context.
 */
class Logger {
  /**
   * @param {string} context - The module/class name for log context
   */
  constructor(context) {
    this.context = context;
  }

  /**
   * Get formatted timestamp string.
   * @returns {string} ISO timestamp
   */
  _getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Format log message with context and timestamp.
   * @param {string} level - Log level (INFO, WARN, ERROR, DEBUG)
   * @param {string} message - Log message
   * @returns {string} Formatted log string
   */
  _formatMessage(level, message) {
    return `[${this._getTimestamp()}] [${level}] [${this.context}] ${message}`;
  }

  /**
   * Log informational message.
   * @param {string} message
   * @param  {...any} args - Additional data to log
   */
  info(message, ...args) {
    console.log(this._formatMessage('INFO', message), ...args);
  }

  /**
   * Log warning message.
   * @param {string} message
   * @param  {...any} args
   */
  warn(message, ...args) {
    console.warn(this._formatMessage('WARN', message), ...args);
  }

  /**
   * Log error message.
   * @param {string} message
   * @param  {...any} args
   */
  error(message, ...args) {
    console.error(this._formatMessage('ERROR', message), ...args);
  }

  /**
   * Log debug message (only in development).
   * @param {string} message
   * @param  {...any} args
   */
  debug(message, ...args) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(this._formatMessage('DEBUG', message), ...args);
    }
  }
}

module.exports = Logger;
