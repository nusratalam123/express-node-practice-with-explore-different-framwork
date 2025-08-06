// src/controller/product.controller.ts
import { Request, Response } from 'express';
import Product from '../model/product.model';
import logger from '../logger';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();

    logger.info('Product created successfully', {
      route: req.path,
      method: req.method,
      body: req.body,
      status: 201,
    });

    res.status(201).json(product);
  } catch (err) {
    logger.error('Error creating product', {
      route: req.path,
      method: req.method,
      error: (err as Error).message,
      status: 500,
    });

    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    logger.info('Fetched all products', {
      route: req.path,
      method: req.method,
      count: products.length,
      status: 200,
    });

    res.status(200).json(products);
  } catch (err) {
    logger.error('Error fetching products', {
      route: req.path,
      method: req.method,
      error: (err as Error).message,
      status: 500,
    });

    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      logger.warn('Product not found', {
        route: req.path,
        method: req.method,
        productId: req.params.id,
        status: 404,
      });

      return res.status(404).json({ message: 'Product not found' });
    }

    logger.info('Fetched single product', {
      route: req.path,
      method: req.method,
      productId: req.params.id,
      status: 200,
    });

    res.status(200).json(product);
  } catch (err) {
    logger.error('Error fetching product', {
      route: req.path,
      method: req.method,
      productId: req.params.id,
      error: (err as Error).message,
      status: 500,
    });

    res.status(500).json({ message: 'Internal server error', error: err });
  }
};
