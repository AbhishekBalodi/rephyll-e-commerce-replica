/**
 * Customer Auth Routes - /api/customer-auth
 * Handles customer signup and authentication endpoints
 */
const express = require('express');
const CustomerAuthController = require('../controllers/CustomerAuthController');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();
const controller = new CustomerAuthController();

// POST /api/customer-auth/signup
const signupRules = [
  { field: 'name', type: 'string', required: true, minLength: 2, maxLength: 100 },
  { field: 'email', type: 'email', required: true, maxLength: 255 },
  { field: 'mobile', type: 'string', required: true, maxLength: 20 },
  { field: 'password', type: 'string', required: true, minLength: 8, maxLength: 128 },
];

router.post('/signup', validateRequest(signupRules), (req, res, next) => 
  controller.signup(req, res, next)
);

module.exports = router;
