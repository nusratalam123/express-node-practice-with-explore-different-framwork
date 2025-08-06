// src/routes/product.routes.ts
import express from 'express';
import { createProduct, getProducts } from '../controller/product.controller';
import validate from '../middleware/validate';
import { createProductSchema } from '../validator/product.validator';

const router = express.Router();

router.post('/create', validate(createProductSchema), createProduct);
router.get('/all', getProducts);

export default router;




