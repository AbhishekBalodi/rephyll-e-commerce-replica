/**
 * ContactRepository - Data access layer for contact_messages table.
 */
const DatabaseManager = require('../database/DatabaseManager');
const Logger = require('../utils/Logger');

class ContactRepository {
  constructor() {
    this.db = DatabaseManager.getInstance();
    this.logger = new Logger('ContactRepository');
  }

  /**
   * Create a new contact message.
   * @param {object} data - { id, name, email, message }
   * @returns {Promise<object>}
   */
  async create(data) {
    this.logger.info(`Inserting contact message: ${data.id}`);
    await this.db.query(
      'INSERT INTO contact_messages (id, name, email, message) VALUES (?, ?, ?, ?)',
      [data.id, data.name, data.email, data.message]
    );
    this.logger.info(`Contact message inserted: ${data.id}`);
    return { id: data.id, name: data.name, email: data.email, message: data.message };
  }

  /**
   * Fetch all contact messages, newest first.
   * @returns {Promise<Array>}
   */
  async findAll() {
    this.logger.debug('Fetching all contact messages...');
    return this.db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
  }
}

module.exports = ContactRepository;
