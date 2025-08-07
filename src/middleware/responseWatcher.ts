// src/middleware/responseWatcher.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import { sendErrorEmail } from '../utils/sendErrorEmail';

export const responseWatcher = (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'POST') return next();

  res.on('finish', async () => {
    try {
      const locals = (res as any).locals || {};
      if (locals.errorAlertHandled) return;

      if (res.statusCode >= 400) {
        logger.error('API Response Error (non-thrown)', {
          method: req.method,
          url: req.originalUrl || req.url,
          statusCode: res.statusCode,
          body: req.body,
          timestamp: new Date().toISOString(),
          service: 'api-service'
        });

        const subject = `🚨 API Response Error: ${req.method} ${req.originalUrl || req.url} - ${res.statusCode}`;
        const text = [
          `API Response Error`,
          `Method: ${req.method}`,
          `URL: ${req.originalUrl || req.url}`,
          `Status: ${res.statusCode}`,
          `Body: ${JSON.stringify(req.body || {})}`,
          `Timestamp: ${new Date().toISOString()}`
        ].join('\n');

        try {
          await sendErrorEmail(subject, text);
          logger.info('responseWatcher: error email sent');
        } catch (sendErr:any) {
          logger.error('responseWatcher: failed to send email', { message: sendErr?.message });
        }
      }
    } catch (outerErr: any) {
      logger.error('responseWatcher failed', { message: outerErr?.message || String(outerErr) });
    }
  });

  next();
};
