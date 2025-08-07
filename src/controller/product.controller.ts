// src/controller/product.controller.ts
import { Request, Response, NextFunction } from 'express';
import Product from '../model/product.model';

// export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // Basic validation — trigger alert if missing
//     if (!req.body.name || req.body.price == null) {
//       const e: any = new Error('Product name and price are required');
//       e.statusCode = 400;
//       return next(e);
//     }

//     const product = new Product(req.body);
//     await product.save();

//     return res.status(201).json(product);
//   } catch (err) {
//     return next(err);
//   }
// };
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body.name || req.body.price == null) {
      const e: any = new Error('Product name and price are required');
      e.statusCode = 400;

      // prevent duplicate error alert in responseWatcher
      (res as any).locals = (res as any).locals || {};
      (res as any).locals.errorAlertHandled = true;

      return next(e);
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json(product); // 👈 No return
  } catch (err) {
    next(err); // 👈 No return
  }
};



export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
