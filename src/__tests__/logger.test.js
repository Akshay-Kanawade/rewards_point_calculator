import logger from '../utils/logger.js';

describe('logger utility', () => {
  let logSpy;
  let warnSpy;
  let errorSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    errorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('development environment logging', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('logger.info calls console.log in development', () => {
      logger.info('Test info message');
      expect(logSpy).toHaveBeenCalled();
      const message = logSpy.mock.calls[0][0];
      expect(message).toContain('[INFO]');
      expect(message).toContain('Test info message');
    });

    it('logger.warn calls console.warn in development', () => {
      logger.warn('Test warning message');
      expect(warnSpy).toHaveBeenCalled();
      const message = warnSpy.mock.calls[0][0];
      expect(message).toContain('[WARN]');
      expect(message).toContain('Test warning message');
    });

    it('logger.error calls console.error in development', () => {
      logger.error('Test error message');
      expect(errorSpy).toHaveBeenCalled();
      const message = errorSpy.mock.calls[0][0];
      expect(message).toContain('[ERROR]');
      expect(message).toContain('Test error message');
    });

    it('logger.error logs error object when provided', () => {
      const testError = new Error('Test error object');
      logger.error('Error occurred', testError);
      expect(errorSpy).toHaveBeenCalledWith(testError);
    });

    it('logger.error with null error parameter does not log error object', () => {
      logger.error('Error occurred', null);
      expect(errorSpy).toHaveBeenCalledTimes(1);
      const firstCall = errorSpy.mock.calls[0][0];
      expect(firstCall).toContain('[ERROR]');
    });

    it('formatted log includes ISO timestamp format', () => {
      logger.info('Timestamp test');
      expect(logSpy).toHaveBeenCalled();
      const message = logSpy.mock.calls[0][0];
      expect(message).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it('message appears after log level in formatted output', () => {
      logger.info('Custom message');
      const message = logSpy.mock.calls[0][0];
      const infoIndex = message.indexOf('[INFO]');
      const messageIndex = message.indexOf('Custom message');
      expect(messageIndex).toBeGreaterThan(infoIndex);
    });
  });

  describe('production environment logging', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('logger.info does not log in production', () => {
      logger.info('Production test');
      expect(logSpy).not.toHaveBeenCalled();
    });

    it('logger.warn does not log in production', () => {
      logger.warn('Production warning');
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('logger.error does not log in production', () => {
      logger.error('Production error');
      expect(errorSpy).not.toHaveBeenCalled();
    });
  });

  describe('log levels', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('info uses INFO level tag', () => {
      logger.info('Info test');
      expect(logSpy.mock.calls[0][0]).toMatch(/\[INFO\]/);
    });

    it('warn uses WARN level tag', () => {
      logger.warn('Warn test');
      expect(warnSpy.mock.calls[0][0]).toMatch(/\[WARN\]/);
    });

    it('error uses ERROR level tag', () => {
      logger.error('Error test');
      expect(errorSpy.mock.calls[0][0]).toMatch(/\[ERROR\]/);
    });
  });

  describe('module exports', () => {
    it('exports info function', () => {
      expect(logger.info).toBeDefined();
      expect(typeof logger.info).toBe('function');
    });

    it('exports warn function', () => {
      expect(logger.warn).toBeDefined();
      expect(typeof logger.warn).toBe('function');
    });

    it('exports error function', () => {
      expect(logger.error).toBeDefined();
      expect(typeof logger.error).toBe('function');
    });

    it('exports three functions total', () => {
      const keys = Object.keys(logger);
      expect(keys).toContain('info');
      expect(keys).toContain('warn');
      expect(keys).toContain('error');
    });
  });

  describe('message handling', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('info accepts any message string', () => {
      logger.info('Simple message');
      logger.info('Message with numbers 12345');
      logger.info('Message with special !@#$%');
      expect(logSpy).toHaveBeenCalledTimes(3);
    });

    it('warn accepts any message string', () => {
      logger.warn('Warning with details');
      expect(warnSpy).toHaveBeenCalled();
      expect(warnSpy.mock.calls[0][0]).toContain('Warning with details');
    });

    it('error accepts message and optional error object', () => {
      logger.error('Error message');
      logger.error('Error message', new Error('Additional error'));
      expect(errorSpy).toHaveBeenCalledTimes(3);
    });
  });
});
