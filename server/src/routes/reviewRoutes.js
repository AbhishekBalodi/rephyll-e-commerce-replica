const express = require('express');
const ReviewController = require('../controllers/ReviewController');

const router = express.Router();
const controller = new ReviewController();

router.post('/', (req, res, next) => controller.createReview(req, res, next));
router.get('/', (req, res, next) => controller.getReviews(req, res, next));

module.exports = router;
