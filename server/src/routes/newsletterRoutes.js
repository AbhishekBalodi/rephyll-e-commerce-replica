/**
 * Newsletter Routes - /api/newsletter
 */
const express = require('express');
const NewsletterController = require('../controllers/NewsletterController');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();
const controller = new NewsletterController();

const subscribeRules = [
  { field: 'email', type: 'email', required: true, maxLength: 255 },
];

router.post('/subscribe', validateRequest(subscribeRules), (req, res, next) => controller.subscribe(req, res, next));

module.exports = router;
