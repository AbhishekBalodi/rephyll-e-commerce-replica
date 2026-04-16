/**
 * App class - Configures Express server with all middleware and routes.
 * Follows Single Responsibility Principle.
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Logger = require('./utils/Logger');

// Route imports
const authRoutes = require('./routes/authRoutes');
const customerAuthRoutes = require('./routes/customerAuthRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const healthRoutes = require('./routes/healthRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Middleware imports
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

class App {
  constructor() {
    this.app = express();
    this.logger = new Logger('App');
    this._initializeMiddleware();
    this._initializeRoutes();
    this._initializeErrorHandling();
    this.logger.info('Express application initialized.');
  }

  /**
   * Configure all middleware.
   */
  _initializeMiddleware() {
    this.logger.info('Configuring middleware...');

    // Security headers
    this.app.use(helmet());
    this.logger.debug('Helmet security headers enabled.');

    // CORS
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }));
    this.logger.debug('CORS configured.');

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: { success: false, message: 'Too many requests. Please try again later.' },
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use(limiter);
    this.logger.debug('Rate limiting configured (100 req/15min).');

    // Body parsing
    this.app.use(express.json({ limit: '10kb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));
    this.logger.debug('Body parsers configured.');

    // Request logging
    this.app.use(requestLogger);
    this.logger.debug('Request logger middleware attached.');
  }

  /**
   * Register all route handlers.
   */
  _initializeRoutes() {
    this.logger.info('Registering routes...');

    this.app.use('/api/health', healthRoutes);
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/customer-auth', customerAuthRoutes);
    this.app.use('/api/contact', contactRoutes);
    this.app.use('/api/newsletter', newsletterRoutes);
    this.app.use('/api/reviews', reviewRoutes);

    this.logger.info('All routes registered.');
  }

  /**
   * Register error handling middleware (must be last).
   */
  _initializeErrorHandling() {
    this.app.use(errorHandler);
    this.logger.debug('Error handler middleware attached.');
  }

  /**
   * Get the Express app instance.
   * @returns {express.Application}
   */
  getServer() {
    return this.app;
  }
}

module.exports = App;
