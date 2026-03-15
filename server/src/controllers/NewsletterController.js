/**
 * NewsletterController - Handles HTTP requests for newsletter subscriptions.
 */
const NewsletterService = require('../services/NewsletterService');
const Logger = require('../utils/Logger');

class NewsletterController {
  constructor() {
    this.newsletterService = new NewsletterService();
    this.logger = new Logger('NewsletterController');
  }

  /**
   * POST /api/newsletter/subscribe
   */
  async subscribe(req, res, next) {
    try {
      this.logger.info('Newsletter subscription request received.');
      this.logger.debug(`Email: ${req.body.email}`);

      const result = await this.newsletterService.subscribe(req.body.email);

      this.logger.info('Newsletter subscription successful.');
      res.status(201).json({
        success: true,
        message: 'Successfully subscribed to the newsletter!',
        data: result,
      });
    } catch (error) {
      this.logger.error(`Newsletter subscription error: ${error.message}`);
      next(error);
    }
  }
}

module.exports = NewsletterController;
