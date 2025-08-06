import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createProductSchema } from '../validator/product.validator';
import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';

const registry = new OpenAPIRegistry();

// Register schema and endpoints
registry.register('Product', createProductSchema);

registry.registerPath({
  method: 'post',
  path: '/products/create',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createProductSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Product created',
    },
    500: {
      description: 'Internal server error',
    },
  },
  summary: 'Create a new product',
  tags: ['Products'],
});

registry.registerPath({
  method: 'get',
  path: '/products/all',
  responses: {
    200: {
      description: 'List all products',
    },
  },
  summary: 'Get all products',
  tags: ['Products'],
});

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Product API',
    version: '1.0.0',
  },
  servers: [{ url: 'http://localhost:5000' }],
});
