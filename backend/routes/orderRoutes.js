import express from 'express';
import { admin, protect } from '../middleware.js/authMiddleware.js';
import { checkExistingTransaction, createOrder, getMyOrders, getOrderById, getOrders, updateOrderToPaid, updateToDelivered } from '../controllers/orderController.js';

const OrderRouter = express.Router();

OrderRouter.route('/').post(protect, createOrder).get(protect, admin, getOrders);

OrderRouter.get('/myorders', protect, getMyOrders);

OrderRouter.get('/:id', protect, getOrderById);

OrderRouter.put('/:id/pay', protect, updateOrderToPaid);

OrderRouter.patch('/:id/deliver', protect, admin, updateToDelivered);

OrderRouter.get('/:id/checkExistingTransaction', protect, checkExistingTransaction);

export default OrderRouter;