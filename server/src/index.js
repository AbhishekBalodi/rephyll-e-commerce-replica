/**
 * Entry point for the rePhyl Express Backend.
 * Initializes database, applies schema, and starts the server.
 */
require('dotenv').config();

const App = require('./app');
const DatabaseManager = require('./database/DatabaseManager');
const SchemaInitializer = require('./database/SchemaInitializer');
const Logger = require('./utils/Logger');

const logger = new Logger('Index');

/**
 * Bootstrap the application:
 * 1. Connect to MySQL
 * 2. Auto-create schema (database + tables)
 * 3. Start Express server
 */
async function bootstrap() {
  try {
    logger.info('Starting rePhyl Backend...');

    // Step 1: Initialize database connection
    const dbManager = DatabaseManager.getInstance();
    await dbManager.initialize();
    logger.info('Database connection established successfully.');

    // Step 2: Auto-create schema
    const schemaInitializer = new SchemaInitializer(dbManager);
    await schemaInitializer.initializeSchema();
    logger.info('Database schema initialized successfully.');

    // Step 3: Start Express server
    const app = new App();
    const port = process.env.PORT || 5000;

    app.getServer().listen(port, () => {
      logger.info(`Server is running on port ${port}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
    });
  } catch (error) {
    logger.error('Failed to start the application:', error.message);
    logger.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error.message);
  logger.error('Stack:', error.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

bootstrap();
