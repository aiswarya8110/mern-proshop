import express from 'express';
import { getProductById, getProducts, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts } from '../controllers/productController.js';
import { admin, protect } from '../middleware.js/authMiddleware.js';
const ProductRouter = express.Router();

ProductRouter.get('/page/:pageNumber/search/:query?', getProducts);

ProductRouter.get('/top', getTopProducts);

ProductRouter.get('/:id', getProductById);

ProductRouter.post('/create', protect, admin, createProduct);

ProductRouter.put('/:id/update', protect, admin, updateProduct);

ProductRouter.delete('/:id/delete', protect, admin, deleteProduct);

ProductRouter.post('/:id', protect, createProductReview);

export default ProductRouter;