/**
 * Auth Routes - /api/auth
 */
const express = require('express');
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();
const controller = new AuthController();

// Validation rules
const registerRules = [
  { field: 'email', type: 'email', required: true, maxLength: 255 },
  { field: 'password', type: 'string', required: true, minLength: 8, maxLength: 128 },
  { field: 'fullName', type: 'string', required: true, minLength: 2, maxLength: 100 },
  { field: 'phone', type: 'string', required: false, maxLength: 20 },
];

const loginRules = [
  { field: 'email', type: 'email', required: true, maxLength: 255 },
  { field: 'password', type: 'string', required: true, minLength: 1, maxLength: 128 },
];

router.post('/register', validateRequest(registerRules), (req, res, next) => controller.register(req, res, next));
router.post('/login', validateRequest(loginRules), (req, res, next) => controller.login(req, res, next));
router.get('/me', authMiddleware, (req, res, next) => controller.getProfile(req, res, next));

module.exports = router;
