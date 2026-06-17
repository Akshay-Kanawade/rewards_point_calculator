// Simple logger utility for application logging
// Prevents console logs from being left in production code
/* eslint-disable no-console */

const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

/**
 * Format log message with timestamp and level
 * @param {string} level - Log level (INFO, WARN, ERROR)
 * @param {string} message - Message to log
 * @returns {string} Formatted log message
 */
const formatLog = (level, message) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
};

/**
 * Log info level messages
 * @param {string} message - Message to log
 */
const info = (message) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(formatLog(LOG_LEVELS.INFO, message));
  }
};

/**
 * Log warning level messages
 * @param {string} message - Message to log
 */
const warn = (message) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(formatLog(LOG_LEVELS.WARN, message));
  }
};

/**
 * Log error level messages
 * @param {string} message - Message to log
 * @param {Error} error - Error object (optional)
 */
const error = (message, errorObj = null) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(formatLog(LOG_LEVELS.ERROR, message));
    if (errorObj) {
      console.error(errorObj);
    }
  }
};

const logger = {
  info,
  warn,
  error,
};

export default logger;
