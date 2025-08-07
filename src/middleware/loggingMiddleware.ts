// src/middleware/loggingMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ignorePaths = ['/', '/metrics', '/health'];

  if (ignorePaths.includes(req.path)) {
    return next(); 
  }

  const startTime = Date.now();

  logger.info('API Request', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - startTime;
    logger.info('API Response', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: body ? body.length : 0,
      timestamp: new Date().toISOString()
    });
    return originalSend.call(this, body);
  };

  next();
};
