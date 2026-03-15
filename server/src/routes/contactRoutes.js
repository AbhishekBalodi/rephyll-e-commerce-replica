/**
 * Contact Routes - /api/contact
 */
const express = require('express');
const ContactController = require('../controllers/ContactController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();
const controller = new ContactController();

// Validation rules for contact form
const contactRules = [
  { field: 'name', type: 'string', required: true, minLength: 2, maxLength: 100 },
  { field: 'email', type: 'email', required: true, maxLength: 255 },
  { field: 'message', type: 'string', required: true, minLength: 10, maxLength: 2000 },
];

// Public: submit a contact message
router.post('/', validateRequest(contactRules), (req, res, next) => controller.submitMessage(req, res, next));

// Protected: get all messages (admin)
router.get('/', authMiddleware, (req, res, next) => controller.getAllMessages(req, res, next));

module.exports = router;
