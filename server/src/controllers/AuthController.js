/**
 * AuthController - Handles HTTP requests for authentication endpoints.
 */
const AuthService = require('../services/AuthService');
const Logger = require('../utils/Logger');

class AuthController {
  constructor() {
    this.authService = new AuthService();
    this.logger = new Logger('AuthController');
  }

  /**
   * POST /api/auth/register
   */
  async register(req, res, next) {
    try {
      this.logger.info('Register endpoint called.');
      this.logger.debug(`Body: ${JSON.stringify({ ...req.body, password: '***' })}`);

      const result = await this.authService.register(req.body);

      this.logger.info('Registration successful.');
      res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        data: result,
      });
    } catch (error) {
      this.logger.error(`Registration error: ${error.message}`);
      next(error);
    }
  }

  /**
   * POST /api/auth/login
   */
  async login(req, res, next) {
    try {
      this.logger.info('Login endpoint called.');
      this.logger.debug(`Email: ${req.body.email}`);

      const result = await this.authService.login(req.body.email, req.body.password);

      this.logger.info('Login successful.');
      res.status(200).json({
        success: true,
        message: 'Login successful.',
        data: result,
      });
    } catch (error) {
      this.logger.error(`Login error: ${error.message}`);
      next(error);
    }
  }

  /**
   * GET /api/auth/me (protected)
   */
  async getProfile(req, res, next) {
    try {
      this.logger.info(`Profile requested for user: ${req.user.userId}`);
      res.status(200).json({
        success: true,
        data: { userId: req.user.userId, email: req.user.email },
      });
    } catch (error) {
      this.logger.error(`Profile error: ${error.message}`);
      next(error);
    }
  }
}

module.exports = AuthController;
