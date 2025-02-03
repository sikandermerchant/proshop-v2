import mongoose from "mongoose";
//here we import bcrypt to hash the password before saving it to the database.
import bcrypt from "bcryptjs";

//Below we have the user schema. The user schema will have the following fields:
//name: This will be a string and is required.
//email: This will be a string, is required, and is unique.
//password: This will be a string and is required.
//isAdmin: This will be a boolean, is required, and has a default value of false.
//timestamps: This will be true. This will add two fields to the schema, createdAt, and updatedAt.
//The createdAt field will store the date and time when the document was created.
//The updatedAt field will store the date and time when the document was last updated.

const userSchema = mongoose.Schema({ 
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true, // createdAt, updatedAt 
});

//Here we create a method to match the password entered by the user with the hashed password in the database.
//we use this.password to access the password in the database and enteredPassword to access the password entered by the user.
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Here we will use the pre method to run a function before the save method is called for a CRUD operation on the user collection. You can also use the post method to run a function after the save method is called. So here will pass in the save method and a function that will run before the save method is called which is an asynchronous function next.
userSchema.pre("save", async function (next) {
  //here we check if the password is not modified. If the password is not modified, we call the next function to move to the next middleware.
  //this here is pertains to the user object that we are working with i.e. the current user object we are saving.
  if (!this.isModified("password")) {
    next();
  }
  //If the password is modified, we will hash the password using bcrypt.
  //First we generate a salt using the genSalt method which takes a number of rounds. The higher the number of rounds, the more secure the password will be. The salt is used to hash the password.
  const salt = await bcrypt.genSalt(10);
  //Next we hash the password using the hash method which takes two arguments.
  //The first argument is the password that we want to hash.
  //The second argument is the salt that we generated above.
  this.password = await bcrypt.hash(this.password, salt);
  //Thus we have now converted the password which we got from the user in the userController to a hashed password.
});


//Here we create the user model using the user schema.
//The User model will be used to perform CRUD operations on the users collection in the database.
//The User model will have methods to authenticate the user and check if the user is an admin.
//The User model will also have a method to hash the password before saving it to the database.
//The User model will be exported and imported in the userRoutes.js file.
//The User model will have methods to authenticate the user and check if the user is an admin.
//The User model will also have a method to hash the password before saving it to the database.
const User = mongoose.model("User", userSchema);
export default User;