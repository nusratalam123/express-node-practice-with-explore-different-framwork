// src/config/logger.ts
import winston from 'winston';
import LokiTransport from 'winston-loki';

const lokiHost = process.env.LOKI_HOST || 'http://localhost:3100';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'api-service' },
  transports: [
    // Console for local debugging
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Loki transport
    new LokiTransport({
      host: lokiHost,
      labels: { job: 'node-api' },
      json: true,
      format: winston.format.json()
    })
  ]
});

export default logger;
