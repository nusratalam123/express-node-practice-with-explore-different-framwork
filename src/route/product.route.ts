// src/routes/product.routes.ts
import express from 'express';
import { createProduct, getProducts } from '../controller/product.controller';
import validate from '../middleware/validate';
import { createProductSchema } from '../validator/product.validator';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.post(
    '/create',
    validate(createProductSchema),
    expressAsyncHandler(createProduct)
  );
  router.get('/all', getProducts);

export default router;




