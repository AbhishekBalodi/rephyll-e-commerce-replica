const { v4: uuidv4 } = require('uuid');
const DatabaseManager = require('../database/DatabaseManager');
const Logger = require('../utils/Logger');

class ReviewRepository {
  constructor() {
    this.db = DatabaseManager.getInstance();
    this.logger = new Logger('ReviewRepository');
  }

  async create({ name, rating, title, content }) {
    const id = uuidv4();
    this.logger.info(`Creating review by: ${name}`);
    await this.db.query(
      'INSERT INTO reviews (id, name, rating, title, content) VALUES (?, ?, ?, ?, ?)',
      [id, name, rating, title, content]
    );
    return { id, name, rating, title, content };
  }

  async findAll() {
    this.logger.info('Fetching all reviews');
    return this.db.query('SELECT * FROM reviews ORDER BY created_at DESC');
  }
}

module.exports = ReviewRepository;
