//Similar to productController.js, we will create a new controller file for user related operations.
//Here we will create a new file called userController.js inside the controllers folder.
//For this we will import the User model and asyncHandler.
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

//Now we create the following controllers in userController.js.For now we will create a basic skeleton of the controller.

//1. Register a new user
//This will be similar to the createProduct controller in productController.js.

//@desc  Register a new user
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
 res.send("register user");
});


//2. Authenticate user and get token
//@desc  Auth user and get token
//@route POST /api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

//3. Log out user
//@desc  Log out user / clear cookie
//@route POST /api/users/logout
//@access Private

const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

//4. Get user profile
//@desc  Get user profile
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//5. Update user profile - here we are not using the id as we will updating the user using the token. Users will have access to their own profile data only using a JWT token.
//@desc  Update user profile
//@route PUT /api/users/profile
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

//6. Get all users
//@desc  Get all users
//@route GET /api/users
//@access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  res.send("get all users");
});

//7. Delete user
//@desc  Delete user
//@route DELETE /api/users/:id
//@access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//8. Get user by ID
//@desc  Get user by ID
//@route GET /api/users/:id
//@access Private/Admin

const getUserByID = asyncHandler(async (req, res) => { 
  res.send("get user by id");
});

//9. Update user by ID
//@desc  Update user by ID
//@route PUT /api/users/:id
//@access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  res.send("update user by id");
});

export {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser
}
