/**
 * AuthService - Handles user registration, login, and JWT generation.
 * Follows Single Responsibility Principle.
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Logger = require('../utils/Logger');
const UserRepository = require('../repositories/UserRepository');

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
    this.logger = new Logger('AuthService');
    this.SALT_ROUNDS = 12;
  }

  /**
   * Register a new user.
   * @param {object} userData - { email, password, fullName, phone }
   * @returns {Promise<{user: object, token: string}>}
   */
  async register(userData) {
    const { email, password, fullName, phone } = userData;
    this.logger.info(`Registering new user with email: ${email}`);

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      this.logger.warn(`Registration failed: email ${email} already exists.`);
      const error = new Error('A user with this email already exists.');
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    this.logger.debug('Hashing password...');
    const passwordHash = await bcrypt.hash(password, this.SALT_ROUNDS);

    // Create user
    const userId = uuidv4();
    const user = await this.userRepository.create({
      id: userId,
      email,
      passwordHash,
      fullName,
      phone: phone || null,
    });

    this.logger.info(`User registered successfully: ${userId}`);

    // Generate token
    const token = this._generateToken(userId, email);
    this.logger.debug(`JWT token generated for user: ${userId}`);

    return { user: this._sanitizeUser(user), token };
  }

  /**
   * Authenticate user and return token.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{user: object, token: string}>}
   */
  async login(email, password) {
    this.logger.info(`Login attempt for email: ${email}`);

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.logger.warn(`Login failed: no user found for email ${email}`);
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      throw error;
    }

    if (!user.is_active) {
      this.logger.warn(`Login failed: account deactivated for ${email}`);
      const error = new Error('Account is deactivated.');
      error.statusCode = 403;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      this.logger.warn(`Login failed: invalid password for ${email}`);
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      throw error;
    }

    const token = this._generateToken(user.id, user.email);
    this.logger.info(`Login successful for user: ${user.id}`);

    return { user: this._sanitizeUser(user), token };
  }

  /**
   * Generate a JWT token.
   * @param {string} userId
   * @param {string} email
   * @returns {string}
   */
  _generateToken(userId, email) {
    return jwt.sign(
      { userId, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  /**
   * Remove sensitive fields from user object.
   * @param {object} user
   * @returns {object}
   */
  _sanitizeUser(user) {
    const { password_hash, ...safeUser } = user;
    return safeUser;
  }
}

module.exports = AuthService;
