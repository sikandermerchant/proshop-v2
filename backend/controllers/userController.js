//Similar to productController.js, we will create a new controller file for user related operations.
//Here we will create a new file called userController.js inside the controllers folder.
//For this we will import the User model and asyncHandler.
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

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
  //We will now send a response to check if the controller is working.
  //We will also log the request body to check if the email and password are being sent.
  // console.log(req.body);
  //Then we will destructure the email and password from the request body.
  const { email, password } = req.body;
  //Next we check for the user in the database using the email by using the findOne method which is a mongoose method to find a single document.
  const user = await User.findOne({ email });
  //Next we will check if the user exists and if the password matches.
  //We will also check if the password matches using the matchPassword method we created in the user model.
  //Here we use the await keyword as the matchPassword method is an asynchronous function. As matchPassword is an instance method, we can access it using the user object.
  if (user && (await user.matchPassword(password))) {
    //here we will create a token using the jwt.sign method which takes three arguments.
    //The first argument is the payload which is the user id.
    //The second argument is the secret key which is used to sign the token. This is stored in the .env file as JWT_SECRET.
    //The third argument is the options which include the expiresIn time.

    const token = jwt.sign({
      userID: user._id,
    }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })

    //In some cases this token will be stored in the local storage but that is not recommended as it can be accessed by the browser and can become a security risk.
    //Instead we will store the jwt in a httpOnly cookie which is more secure.
    //We will use the res.cookie method to set the cookie.
    //The first argument is the name of the cookie which is token.
    //The second argument is the token itself.
    //The third argument is the options which include the expires time, httpOnly, and secure.
    //The httpOnly option is set to true to make the cookie accessible only by the web server.
    //The secure option is set to true to make the cookie accessible only by HTTPS but only in production. Hence while we are in develpment we will set it to false by process.env.NODE_ENV === "development".
    //The sameSite option is set to strict to prevent CSRF attacks. CSRF stands for Cross-Site Request Forgery.
    //The maxAge option is set to 30 days.
    res.cookie("jwt", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else { 
    res.status(401);
    throw new Error("Invalid email or password");
  }
 
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
