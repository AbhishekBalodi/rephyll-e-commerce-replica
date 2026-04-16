/**
 * CustomerAuthController - Handles customer authentication endpoints
 * Implements the new /api/customer-auth/* endpoints
 */
const AuthService = require('../services/AuthService');
const Logger = require('../utils/Logger');
const { v4: uuidv4 } = require('uuid');

class CustomerAuthController {
  constructor() {
    this.authService = new AuthService();
    this.logger = new Logger('CustomerAuthController');
  }

  /**
   * POST /api/customer-auth/signup
   * Signup with request body: { name, email, mobile, password }
   */
  async signup(req, res, next) {
    try {
      this.logger.info('Customer signup endpoint called.');
      this.logger.debug(`Body: ${JSON.stringify({ 
        name: req.body.name, 
        email: req.body.email, 
        mobile: req.body.mobile,
        password: '***' 
      })}`);

      // Map new API field names to auth service field names
      const authData = {
        fullName: req.body.name,
        email: req.body.email,
        phone: req.body.mobile,
        password: req.body.password,
      };

      // Use existing registration service
      const result = await this.authService.register(authData);

      this.logger.info('Customer signup successful.');

      // Transform response to match new spec
      // Generate IDs based on user data
      const loginId = result.user.id;
      const personId = Math.floor(Math.abs(parseInt(result.user.id.replace(/-/g, ''), 16)) / 1000000) % 1000000;
      const customerProfileId = uuidv4();
      const childRoleId = 1; // Default role ID

      const signupResponse = {
        success: true,
        message: 'Customer signup successful',
        data: {
          loginId,
          personId,
          customerProfileId,
          childRoleId,
          username: result.user.email.split('@')[0], // Generate username from email
          name: result.user.full_name,
          email: result.user.email,
          mobile: result.user.phone || req.body.mobile,
        },
      };

      res.status(201).json(signupResponse);

    } catch (error) {
      this.logger.error(`Customer signup error: ${error.message}`);
      next(error);
    }
  }
}

module.exports = CustomerAuthController;
