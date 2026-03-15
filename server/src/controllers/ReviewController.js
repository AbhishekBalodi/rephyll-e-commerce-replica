const ReviewService = require('../services/ReviewService');
const Logger = require('../utils/Logger');

class ReviewController {
  constructor() {
    this.reviewService = new ReviewService();
    this.logger = new Logger('ReviewController');
  }

  async createReview(req, res, next) {
    try {
      const { name, rating, title, content } = req.body;
      this.logger.info(`Create review request from: ${name}`);
      const review = await this.reviewService.createReview({ name, rating, title, content });
      res.status(201).json({ success: true, message: 'Review submitted successfully', data: review });
    } catch (error) {
      next(error);
    }
  }

  async getReviews(req, res, next) {
    try {
      const reviews = await this.reviewService.getAllReviews();
      res.json({ success: true, message: 'Reviews fetched', data: reviews });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReviewController;
