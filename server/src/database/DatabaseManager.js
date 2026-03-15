/**
 * DatabaseManager - Singleton class for managing MySQL connection pool.
 * Uses mysql2/promise for async operations.
 */
const mysql = require('mysql2/promise');
const Logger = require('../utils/Logger');

class DatabaseManager {
  static instance = null;

  constructor() {
    this.pool = null;
    this.logger = new Logger('DatabaseManager');
  }

  /**
   * Get singleton instance.
   * @returns {DatabaseManager}
   */
  static getInstance() {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
      DatabaseManager.instance.logger.info('DatabaseManager singleton created.');
    }
    return DatabaseManager.instance;
  }

  /**
   * Initialize the connection pool (without specifying a database initially).
   * The SchemaInitializer will create the database if needed,
   * then we recreate the pool with the database selected.
   */
  async initialize() {
    this.logger.info('Creating initial MySQL connection pool (no database)...');
    this.logger.debug(`Host: ${process.env.DB_HOST}, Port: ${process.env.DB_PORT}, User: ${process.env.DB_USER}`);

    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Test connection
    const connection = await this.pool.getConnection();
    this.logger.info('MySQL connection test successful.');
    connection.release();
  }

  /**
   * Recreate pool with a specific database selected.
   * @param {string} dbName - Database name to connect to
   */
  async connectToDatabase(dbName) {
    this.logger.info(`Reconnecting pool to database: ${dbName}`);

    if (this.pool) {
      await this.pool.end();
      this.logger.debug('Previous pool closed.');
    }

    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const connection = await this.pool.getConnection();
    this.logger.info(`Connected to database: ${dbName}`);
    connection.release();
  }

  /**
   * Execute a SQL query.
   * @param {string} sql - SQL query string
   * @param {Array} params - Query parameters
   * @returns {Promise<Array>} Query results
   */
  async query(sql, params = []) {
    this.logger.debug(`Executing query: ${sql.substring(0, 100)}...`);
    this.logger.debug(`Params: ${JSON.stringify(params)}`);

    try {
      const [results] = await this.pool.execute(sql, params);
      this.logger.debug(`Query returned ${Array.isArray(results) ? results.length : 0} rows.`);
      return results;
    } catch (error) {
      this.logger.error(`Query failed: ${error.message}`);
      this.logger.error(`SQL: ${sql}`);
      this.logger.error(`Params: ${JSON.stringify(params)}`);
      throw error;
    }
  }

  /**
   * Execute a raw query (for DDL statements like CREATE DATABASE).
   * @param {string} sql
   * @returns {Promise<Array>}
   */
  async rawQuery(sql) {
    this.logger.debug(`Executing raw query: ${sql.substring(0, 120)}...`);
    try {
      const [results] = await this.pool.query(sql);
      return results;
    } catch (error) {
      this.logger.error(`Raw query failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Close the connection pool.
   */
  async close() {
    if (this.pool) {
      await this.pool.end();
      this.logger.info('Database connection pool closed.');
    }
  }
}

module.exports = DatabaseManager;
