import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import { sendErrorEmail } from '../utils/sendErrorEmail';

export const errorHandler = async (err: any, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  // prevent duplicate alerts
  (res as any).locals = (res as any).locals || {};
  (res as any).locals.errorAlertHandled = true;

  logger.error('API Error (thrown)', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    statusCode,
    service: 'api-service',
    timestamp: new Date().toISOString()
  });

  try {
    const subject = `🔥 API Error: ${req.method} ${req.originalUrl} - ${statusCode}`;
    const text = [
      `Message: ${err.message}`,
      `Stack: ${err.stack}`,
      `Method: ${req.method}`,
      `URL: ${req.originalUrl}`,
      `Status: ${statusCode}`,
      `Body: ${JSON.stringify(req.body)}`,
      `Timestamp: ${new Date().toISOString()}`
    ].join('\n');

    await sendErrorEmail(subject, text);
    logger.info('errorHandler: error email sent');
  } catch (emailErr: any) {
    logger.error('errorHandler: failed to send email', { message: emailErr?.message });
  }

  res.status(statusCode).json({ message: err.message || 'Internal Server Error' });
};
