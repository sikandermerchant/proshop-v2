//Now that we have created the skeleton of the controllers, we will create the routes in userRoutes.js.
//The userRoutes.js file will be similar to the productRoutes.js file.
//We will import express and create a router.
import express from "express";
//We will create a router object using express.Router().
const router = express.Router();
//We will now import the controllers that we have created in userController.js.
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
router.route("/").post(registerUser).get(getUsers);
//We will create a POST route for user to login.
router.post("/login", authUser);
//We will create a GET route for user to logout.
router.post("/logout", logoutUser);
//We will create a GET route for user to get their profile and update their profile via a PUT route.
router.route("/profile").get(getUserProfile).put(updateUserProfile);
//We will create a DELETE route for admin to delete a user by id, GET route for admin to get a user by ID, and a PUT route for admin to update a user by ID.
router.route("/:id").delete(deleteUser).get(getUserByID).put(updateUser);

//We will now export the router. By doing this, we can import the router in server.js which will also import all the routes created in userRoutes.js.
export default router;

