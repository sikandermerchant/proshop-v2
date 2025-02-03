//In this file we will have 2 functions:
//1. protect - This function will check if the user is logged in or not. If the user is logged in, the user's information will be stored in the req.user object.
//2. admin - This function will check if the user is an admin or not. If the user is an admin, the user's information will be stored in the req.user object.
//lets first import jwt,User model and our own asyncHandler function.
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//now we will create the protect middleware function.
//This function will check if the user is logged in or not. If the user is logged in, the user's information will be stored in the req.user object.
//Any middleware function in Express has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next. This next middleware is used to pass control to the next middleware function in the request-response cycle.
const protect = asyncHandler(async (req, res, next) => {
  //define a variable for jwt 
  let token;
  //Read the jwt from the cookie
  token = req.cookies.jwt; //this will read the jwt from the cookie. In the user controller we set the token name as jwt in the cookie.
  if (token) {
    try {
      //here we will decode the token using the jwt.verify method which takes two arguments.
      //The first argument is the token itself.
      //The second argument is the secret key which is used to sign the token. This is stored in the .env file as JWT_SECRET. decoded is an object that contains the payload. In this case, the payload is the user id.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //This will find the user by id, which is stored in the decoded object. The findById method is a mongoose method that is used to find a single document by its id. Here we pass the id that is stored in the decoded object. 
      // The select method is used to exclude the password from the user object. The user object is stored in the req.user object.
      //This user object will now be on all user routes. So if we are working with the profile route, we can access the user object by using req.user there as well. And this user will be the user that is logged in.
      req.user = await User.findById(decoded.userID).select("-password"); 
      //here we call the next function to move to the next middleware.
      next();
      //the catch block will run if the token is not valid. We have the toke but it is not valid. Hence it will return an error accordingly.
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  //The else block will run if there is no token. Hence it will return an error accordingly.
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//Now we will create the admin middleware function.
const admin = (req, res, next) => { 
  //If the user is an admin, we will call the next function to move to the next middleware.
  //Here first we check req.user where we have stored the user object in the protect function. Then we check if the user is an admin.
  if (req.user && req.user.isAdmin) {
    next();
  //If the user is not an admin, we will return an error
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
//The above middleware functions will be used in the userRoutes.js file. The protect middleware function will be used to check if the user is logged in or not. The admin middleware function will be used to check if the user is an admin or not.
export { protect, admin };