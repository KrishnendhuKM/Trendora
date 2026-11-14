import express from 'express';

import {
  getProducts,
  getProductById,
  createProduct,
} from '../controllers/productController.js';

const router = express.Router();

// GET all products
router.get('/', getProducts);

// GET a single product
router.get('/:id', getProductById);

// POST create a product
router.post('/', createProduct);

export default router;