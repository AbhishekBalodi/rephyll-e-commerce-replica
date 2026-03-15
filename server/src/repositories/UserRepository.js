/**
 * UserRepository - Data access layer for users table.
 * Follows Repository Pattern (part of SOLID - Dependency Inversion).
 */
const DatabaseManager = require('../database/DatabaseManager');
const Logger = require('../utils/Logger');

class UserRepository {
  constructor() {
    this.db = DatabaseManager.getInstance();
    this.logger = new Logger('UserRepository');
  }

  /**
   * Create a new user.
   * @param {object} data - { id, email, passwordHash, fullName, phone }
   * @returns {Promise<object>}
   */
  async create(data) {
    this.logger.info(`Creating user record: ${data.id}`);
    await this.db.query(
      'INSERT INTO users (id, email, password_hash, full_name, phone) VALUES (?, ?, ?, ?, ?)',
      [data.id, data.email, data.passwordHash, data.fullName, data.phone]
    );
    this.logger.info(`User record created: ${data.id}`);
    return this.findById(data.id);
  }

  /**
   * Find user by ID.
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  async findById(id) {
    this.logger.debug(`Finding user by ID: ${id}`);
    const results = await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Find user by email.
   * @param {string} email
   * @returns {Promise<object|null>}
   */
  async findByEmail(email) {
    this.logger.debug(`Finding user by email: ${email}`);
    const results = await this.db.query('SELECT * FROM users WHERE email = ?', [email]);
    return results.length > 0 ? results[0] : null;
  }
}

module.exports = UserRepository;
