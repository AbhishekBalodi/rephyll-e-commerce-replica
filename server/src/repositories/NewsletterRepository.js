/**
 * NewsletterRepository - Data access layer for newsletter_subscribers table.
 */
const DatabaseManager = require('../database/DatabaseManager');
const Logger = require('../utils/Logger');

class NewsletterRepository {
  constructor() {
    this.db = DatabaseManager.getInstance();
    this.logger = new Logger('NewsletterRepository');
  }

  /**
   * Create a new subscriber.
   * @param {object} data - { id, email }
   * @returns {Promise<object>}
   */
  async create(data) {
    this.logger.info(`Inserting newsletter subscriber: ${data.id}`);
    await this.db.query(
      'INSERT INTO newsletter_subscribers (id, email) VALUES (?, ?)',
      [data.id, data.email]
    );
    this.logger.info(`Newsletter subscriber inserted: ${data.id}`);
    return { id: data.id, email: data.email, is_active: 1 };
  }

  /**
   * Find subscriber by email.
   * @param {string} email
   * @returns {Promise<object|null>}
   */
  async findByEmail(email) {
    this.logger.debug(`Finding subscriber by email: ${email}`);
    const results = await this.db.query(
      'SELECT * FROM newsletter_subscribers WHERE email = ?',
      [email]
    );
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Reactivate a subscriber.
   * @param {string} id
   */
  async reactivate(id) {
    this.logger.info(`Reactivating subscriber: ${id}`);
    await this.db.query(
      'UPDATE newsletter_subscribers SET is_active = 1 WHERE id = ?',
      [id]
    );
  }
}

module.exports = NewsletterRepository;
