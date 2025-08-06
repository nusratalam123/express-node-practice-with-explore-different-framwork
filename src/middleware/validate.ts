// src/middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import logger from '../logger';

const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      logger.error('Validation failed', {
        route: req.path,
        method: req.method,
        errors: result.error.errors,
        body: req.body,
      });
      // Respond with validation errors — but don't return the response object
      res.status(400).json({
        message: 'Validation failed',
        errors: result.error.errors,
      });
      return; // Just exit the function
    }

    logger.info('Validation succeeded', {
      route: req.path,
      method: req.method,
      body: req.body,
    });

    req.body = result.data; // Optional: parsed & typed data
    next(); // Proceed to the next middleware/controller
  };
};
export default validate;

