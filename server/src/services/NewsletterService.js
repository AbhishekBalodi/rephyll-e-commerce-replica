/**
 * NewsletterService - Business logic for newsletter subscriptions.
 */
const { v4: uuidv4 } = require('uuid');
const Logger = require('../utils/Logger');
const NewsletterRepository = require('../repositories/NewsletterRepository');

class NewsletterService {
  constructor() {
    this.newsletterRepository = new NewsletterRepository();
    this.logger = new Logger('NewsletterService');
  }

  /**
   * Subscribe an email to the newsletter.
   * @param {string} email
   * @returns {Promise<object>}
   */
  async subscribe(email) {
    this.logger.info(`Newsletter subscription request for: ${email}`);

    // Check if already subscribed
    const existing = await this.newsletterRepository.findByEmail(email);
    if (existing) {
      if (existing.is_active) {
        this.logger.warn(`Email ${email} is already subscribed.`);
        const error = new Error('This email is already subscribed.');
        error.statusCode = 409;
        throw error;
      }
      // Reactivate
      await this.newsletterRepository.reactivate(existing.id);
      this.logger.info(`Reactivated subscription for: ${email}`);
      return { id: existing.id, email, is_active: 1 };
    }

    const id = uuidv4();
    const record = await this.newsletterRepository.create({ id, email });
    this.logger.info(`New newsletter subscription: ${id}`);
    return record;
  }
}

module.exports = NewsletterService;
