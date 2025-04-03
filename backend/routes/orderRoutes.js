import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
// In the orderRoutes.js file, we have created the routes for the order controllers.
// We have imported the controllers from the orderController.js file.
// We have imported the protect and admin middleware from the authMiddleware.js file.
// We have created the routes for the controllers.
// We have protected the routes using the protect and admin middleware.
// We have exported the router.
// This file will be imported in the server.js file to use the routes in the application.
// Now that we have created the skeleton of the controllers, we will create the routes in orderRoutes.js.
// The orderRoutes.js file will be similar to the productRoutes.js file.
// We will import express and create a router. 
// We will create a router object using express.Router().
// We will now import the controllers that we have created in orderController.js.
// We will import protect and admin from the authMiddleware.js file to protect the routes.
// We will now create the routes for the controllers.
// We will create a POST route for user to add order items.
// We will protect the route using the protect middleware. This will check if the user is logged in or not.
// We will create a GET route for admin to get all orders.
// We will protect the route using the protect and admin middleware. This will check if the user is an admin or not.
// We will create a GET route for user to get their orders.
// We will protect the route using the protect middleware. This will check if the user is logged in or not.
// We will create a GET route for user to get their order by ID.
// We will protect the route using the protect middleware. This will check if the user is logged in or not.
// We will create a PUT route for user to update their order to paid.
// We will protect the route using the protect middleware. This will check if the user is logged in or not.
// We will create a PUT route for admin to update the order to delivered.
// We will protect the route using the protect and admin middleware. This will check if the user is an admin or not.
// We will now export the router. By doing this, we can import the router in server.js which will also import all the routes created in orderRoutes.js.