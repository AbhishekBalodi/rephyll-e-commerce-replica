/**
 * SchemaInitializer - Creates database and tables on startup.
 * Ensures schema exists before the application processes requests.
 */
const Logger = require('../utils/Logger');

class SchemaInitializer {
  /**
   * @param {import('./DatabaseManager')} dbManager
   */
  constructor(dbManager) {
    this.dbManager = dbManager;
    this.logger = new Logger('SchemaInitializer');
    this.dbName = process.env.DB_NAME || 'rephyl_db';
  }

  /**
   * Initialize the full schema: database + all tables.
   */
  async initializeSchema() {
    this.logger.info(`Initializing schema for database: ${this.dbName}`);

    await this._createDatabase();
    await this.dbManager.connectToDatabase(this.dbName);
    await this._createUsersTable();
    await this._createContactMessagesTable();
    await this._createNewsletterSubscribersTable();

    this.logger.info('All tables created/verified successfully.');
  }

  /**
   * Create the database if it does not exist.
   */
  async _createDatabase() {
    this.logger.info(`Creating database if not exists: ${this.dbName}`);
    await this.dbManager.rawQuery(
      `CREATE DATABASE IF NOT EXISTS \`${this.dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    this.logger.info(`Database "${this.dbName}" is ready.`);
  }

  /**
   * Create users table for authentication.
   */
  async _createUsersTable() {
    this.logger.info('Creating users table if not exists...');
    await this.dbManager.rawQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) DEFAULT NULL,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_users_email (email),
        INDEX idx_users_active (is_active)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    this.logger.info('Users table is ready.');
  }

  /**
   * Create contact_messages table for the Contact Us form.
   */
  async _createContactMessagesTable() {
    this.logger.info('Creating contact_messages table if not exists...');
    await this.dbManager.rawQuery(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_contact_email (email),
        INDEX idx_contact_read (is_read),
        INDEX idx_contact_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    this.logger.info('Contact messages table is ready.');
  }

  /**
   * Create newsletter_subscribers table for email subscriptions.
   */
  async _createNewsletterSubscribersTable() {
    this.logger.info('Creating newsletter_subscribers table if not exists...');
    await this.dbManager.rawQuery(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        is_active TINYINT(1) DEFAULT 1,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_newsletter_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    this.logger.info('Newsletter subscribers table is ready.');
  }
}

module.exports = SchemaInitializer;
