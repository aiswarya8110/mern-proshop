import express from 'express';
import { admin, protect } from '../middleware.js/authMiddleware.js';
import { createOrder, getMyOrders, getOrderById, getOrders, updateOrderToPaid, updateToDelivered } from '../controllers/orderController.js';

const OrderRouter = express.Router();

OrderRouter.route('/').post(protect, createOrder).get(protect, admin, getOrders);

OrderRouter.get('/myorders', protect, getMyOrders);

OrderRouter.get('/:id', protect, getOrderById);

OrderRouter.get('/:id/pay', protect, updateOrderToPaid);

OrderRouter.get('/:id/deliver', protect, updateToDelivered);

export default OrderRouter;