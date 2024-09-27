import express from 'express';
import { getProductById, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { admin, protect } from '../middleware.js/authMiddleware.js';
const ProductRouter = express.Router();

ProductRouter.get('', getProducts);

ProductRouter.get('/:id', getProductById);

ProductRouter.post('/create', protect, admin, createProduct);

ProductRouter.put('/:id/update', protect, admin, updateProduct);

ProductRouter.delete('/:id/delete', protect, admin, deleteProduct);

export default ProductRouter;