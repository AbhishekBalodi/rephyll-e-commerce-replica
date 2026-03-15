/**
 * ContactController - Handles HTTP requests for contact form.
 */
const ContactService = require('../services/ContactService');
const Logger = require('../utils/Logger');

class ContactController {
  constructor() {
    this.contactService = new ContactService();
    this.logger = new Logger('ContactController');
  }

  /**
   * POST /api/contact
   */
  async submitMessage(req, res, next) {
    try {
      this.logger.info('Contact form submission received.');
      this.logger.debug(`Body: ${JSON.stringify(req.body)}`);

      const result = await this.contactService.submitMessage(req.body);

      this.logger.info('Contact message saved successfully.');
      res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully!',
        data: result,
      });
    } catch (error) {
      this.logger.error(`Contact submission error: ${error.message}`);
      next(error);
    }
  }

  /**
   * GET /api/contact (protected - admin)
   */
  async getAllMessages(req, res, next) {
    try {
      this.logger.info('Fetching all contact messages (admin).');
      const messages = await this.contactService.getAllMessages();

      res.status(200).json({
        success: true,
        data: messages,
      });
    } catch (error) {
      this.logger.error(`Fetch messages error: ${error.message}`);
      next(error);
    }
  }
}

module.exports = ContactController;
