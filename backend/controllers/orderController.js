import asyncHandler from 'express-async-handler';
import Order from '../models/orders.js';

// @desc    Create new Order
// @route   POST /api/order
// @access  Private
const createOrder = asyncHandler(async(req, res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = new Order({
        orderItems: orderItems.map((item)=>({
        ...item, 
        product: item._id,
         _id: undefined
        })
        ),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
})

// @desc    Get Order by ID (Used By Both Admin And Users)
// @route   GET /api/order/:id
// @access  Private
const getOrderById = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.status(200).json(order);
    }
    else{
        res.status(404);
        throw new Error('Order not found.');
    }
})

// @desc    Get logged in user's orders
// @route   GET /api/order/myorders
// @access  Private
const getMyOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({user: req.user._id});
    
    res.status(200).json(orders);
})

// @desc    Update order to paid
// @route   GET /api/order/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async(req, res)=>{
    res.json("update order to paid");
})

// @desc    Update order as delivered
// @route   GET /api/order/:id/deliver
// @access  Private/Admin
const updateToDelivered = asyncHandler(async(req, res)=>{
    res.json("update order as delivered");
})

// @desc    Get All Users Orders 
// @route   GET /api/order
// @access  Private/Admin
const getOrders = asyncHandler(async(req, res)=>{
    res.json("orders list");
})

export { createOrder, getOrderById, getMyOrders, updateOrderToPaid, updateToDelivered, getOrders };