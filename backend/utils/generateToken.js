//We have created a util folder and in this file we will create a function to generate a token. We have already done that in the userController.js file. We will now move this function to the generateToken.js file in the utils folder.
//First we will import jwt.
import jwt from 'jsonwebtoken';

//Now we will create a function called generateToken which will take two arguments.
//The first argument is the response object - we will be using the cookie method to set the token in the cookie.

const generateToken = (res, userID) => {
  //Inside the function body we will take the code from the authUser controller in the in the userController.js file, where we have generated the token.
  const token = jwt.sign({
        userID,
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
  
};

export default generateToken;