import winston from 'winston';
import LokiTransport from 'winston-loki';

const logger = winston.createLogger({
  transports: [
    new LokiTransport({
      host: 'http://loki:3100', // Use 'http://localhost:3100' if running locally, or 'loki:3100' in Docker Compose
      labels: { job: 'my-node-app' },
      json: true,
    }),
    new winston.transports.Console()
  ]
});

export default logger;
