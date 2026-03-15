const ReviewRepository = require('../repositories/ReviewRepository');
const Logger = require('../utils/Logger');

class ReviewService {
  constructor() {
    this.reviewRepo = new ReviewRepository();
    this.logger = new Logger('ReviewService');
  }

  async createReview({ name, rating, title, content }) {
    this.logger.info(`Creating review by ${name}, rating: ${rating}`);
    if (!name || !title || !content || !rating) {
      throw new Error('All fields are required');
    }
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    return this.reviewRepo.create({ name, rating, title, content });
  }

  async getAllReviews() {
    return this.reviewRepo.findAll();
  }
}

module.exports = ReviewService;
