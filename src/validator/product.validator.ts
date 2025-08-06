// src/validators/product.validator.ts
import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

// ✅ Extend Zod with OpenAPI
extendZodWithOpenApi(z);

// ✅ Define the schema with .openapi
export const createProductSchema = z
  .object({
    name: z.string().min(1).openapi({ example: 'iPhone 15' }),
    price: z.number().positive().openapi({ example: 999 }),
    description: z.string().min(1).openapi({ example: 'Latest Apple iPhone with new features' }),
  })
  .openapi('Product');

export type CreateProductRequestBody = z.infer<typeof createProductSchema>;
