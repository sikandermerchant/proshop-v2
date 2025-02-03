import mongoose from "mongoose";
//here we import bcrypt to hash the password before saving it to the database.
import bcrypt from "bcryptjs";


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
const User = mongoose.model("User", userSchema);
export default User;