import asyncHandler from "express-async-handler";
import { verifyPayPalPayment } from "../utils/paypal.js";
import Order from "../models/orders.js";
import Product from "../models/product.js";
import calcPrices from "../utils/calPrices.js";

// @desc    Create new Order
// @route   POST /api/order
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { cartItems, shippingAddress, paymentMethod } = req.body;

  const dbProducts = await Product.find({
    _id: {
      $in: cartItems.map((item) => item._id),
    },
  });

  // Setting each cart Item to its price from our database products
  const dbOrderItems = cartItems.map((itemFromClient, index) => {
    const dbProductItem = dbProducts[index];

    return {
      ...itemFromClient,
      price: dbProductItem.price,
      product: itemFromClient._id,
      _id: undefined,
    };
  });

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calcPrices(dbOrderItems);

  const order = new Order({
    orderItems: dbOrderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Get Order by ID (Used By Both Admin And Users)
// @route   GET /api/order/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

// @desc    Get logged in user's orders
// @route   GET /api/order/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

// @desc    Update order to paid
// @route   PUT /api/order/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { id: transactionId } = req.body;
  const { verified } = await verifyPayPalPayment(transactionId);
  if (!verified) throw new Error("Payment not verified");

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.PayPalTransactionId = transactionId;
    const updatedOrder = await order.save();

    res.status(201).json(updatedOrder);
  } else {
    res.status(404).send("Order not found.");
    throw new Error("Order not found.");
  }
});

// @desc    Update order as delivered
// @route   PATCH /api/order/:id/deliver
// @access  Private/Admin
const updateToDelivered = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).send(updatedOrder);
  } else {
    res.status(404).send("Order not found");
    throw new Error("Order not found");
  }
});

// @desc    Get All Users Orders
// @route   GET /api/order
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name email");

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(500).json("Error while getting orders.");
    throw new Error("Error while getting orders.");
  }
});

// @desc    Check existing transaction for the order
// @route   GET /api/order/:id/checkExistingTransaction
// @access  Private
const checkExistingTransaction = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (order) {
    if (!order.PayPalTransactionId) {
      res.status(200);
      return;
    }
    res.status(409).send("Payment already approved.");
    throw new Error("Payment already approved.");
  } else {
    res.status(404).send("Order not found");
    throw new Error("Order not found");
  }
});

export {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateToDelivered,
  getOrders,
  checkExistingTransaction,
};
