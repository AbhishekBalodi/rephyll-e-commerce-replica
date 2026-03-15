/**
 * ContactService - Business logic for contact form submissions.
 */
const { v4: uuidv4 } = require('uuid');
const Logger = require('../utils/Logger');
const ContactRepository = require('../repositories/ContactRepository');

class ContactService {
  constructor() {
    this.contactRepository = new ContactRepository();
    this.logger = new Logger('ContactService');
  }

  /**
   * Submit a new contact message.
   * @param {object} data - { name, email, message }
   * @returns {Promise<object>} Created message record
   */
  async submitMessage(data) {
    const { name, email, message } = data;
    this.logger.info(`New contact message from: ${name} (${email})`);
    this.logger.debug(`Message length: ${message.length} characters`);

    const id = uuidv4();
    const record = await this.contactRepository.create({
      id,
      name,
      email,
      message,
    });

    this.logger.info(`Contact message saved with ID: ${id}`);
    return record;
  }

  /**
   * Get all contact messages (admin use).
   * @returns {Promise<Array>}
   */
  async getAllMessages() {
    this.logger.info('Fetching all contact messages...');
    const messages = await this.contactRepository.findAll();
    this.logger.info(`Found ${messages.length} contact messages.`);
    return messages;
  }
}

module.exports = ContactService;
