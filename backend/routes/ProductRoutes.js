import express from 'express';
import { getProductById, getProducts } from '../controllers/productController.js';

const ProductRouter = express.Router();

ProductRouter.get('', getProducts);

ProductRouter.get('/:id', getProductById);

export default ProductRouter;