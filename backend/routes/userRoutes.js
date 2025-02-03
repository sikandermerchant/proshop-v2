//Now that we have created the skeleton of the controllers, we will create the routes in userRoutes.js.
//The userRoutes.js file will be similar to the productRoutes.js file.
//We will import express and create a router.
import express from "express";
//We will create a router object using express.Router().
const router = express.Router();
//We will now import the controllers that we have created in userController.js.
//We will import protect and admin from the authMiddleware.js file to protect the routes.
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser
} from "../controllers/userController.js";

//We will now create the routes for the controllers.
//We will create a GET route for admin to get all users via a middleware.If not admin then the user will use a POST request to register. 
//We will use the protect and admin middleware to protect the route. This will check if the user is an admin or not for get all users.
router.route("/").post(registerUser).get(protect, admin, getUsers);
//We will create a POST route for user to login.
router.post("/auth", authUser);
//We will create a GET route for user to logout.
router.post("/logout", logoutUser);
//We will create a GET route for user to get their profile and update their profile via a PUT route.
//We will use the protect middleware to protect the route. This will check if the user is logged in or not for profile and update profile.
//Here we have added the protect middleware to the getUserProfile and updateUserProfile routes. This will check if the user is logged in or not. If the user is logged in, the user's information will be stored in the req.user object.
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
//We will create a DELETE route for admin to delete a user by id, GET route for admin to get a user by ID, and a PUT route for admin to update a user by ID.
//We will protect the routes delete, getUserByID, and updateUser using the protect and admin middleware. This will check if the user is an admin or not for delete, get user by id, and update user by id.
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUser);

//We will now export the router. By doing this, we can import the router in server.js which will also import all the routes created in userRoutes.js.
export default router;

