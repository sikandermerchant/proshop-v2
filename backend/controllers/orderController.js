import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

//@desc Create new order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  // res.send('add order items');
  //Here we are creating an order. We are getting the order items, shipping address, payment method, items price, tax price, shipping price, and total price from the request body. We are checking if there are any order items. If there are no order items, we are sending a response with a status code of 400 and an error message. We return from the function. 
  // If there are order items, we are creating a new order with the order items. The name, qty, image, price will all come from the front end however the product just has the id for each product so we will need to map through the order items and set the product to the id of the product.
  // The orders items are mapped to return a new object with all the properties of the order item like name, qty, image, price, etc. The product is set to the id of the product. The _id is set to undefined. This is done because when we save the order items, we don't want the product id to be saved in the order items. The product id is already saved in the product field. We only want the product id to be saved in the order items.
  // We are setting the user id, shipping address, payment method, items price, tax price, shipping price, and total price in the order. We are saving the order and sending a response with a status code of 201 and the created order.
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  }
});

//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  // res.send('get my orders');
  //Here we are getting the orders of the logged in user. We are finding the orders where the user is the logged in user. We are sending the orders as a response.
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//@desc Get order by ID
//@route GET /api/orders/:id
//@access Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
  // res.send('get order by id');
  //Here we are getting the order by id. We are finding the order by id. We are also populating the user field with the name and email of the user. If the order is not found, we are sending a response with a status code of 404 and an error message. If the order is found, we are sending the order as a response.
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('update order to paid');
});

//@desc Update order to delivered
//@route PUT /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order to delivered');
});

//@desc Get all orders
//@route GET /api/orders
//@access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('get all orders');
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders
};