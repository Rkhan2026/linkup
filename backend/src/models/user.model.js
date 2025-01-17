//models
//Purpose: Contains the definitions of the application's data models.
//Role: Defines how data is structured and interacts with the database 
        // (e.g., schemas in MongoDB or models in Sequelize).
//Example: A userModel.js might define a User schema with fields like name, email, and password.

// Importing mongoose to interact with MongoDB
import mongoose from "mongoose";

// Defining the user schema for the "User" collection
const userSchema = new mongoose.Schema(
  {
    // Email field, required and must be unique
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Full name field, required
    fullName: {
      type: String,
      required: true,
    },
    // Password field, required with a minimum length of 6 characters
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // Profile picture field, default value is an empty string
    profilePic: {
      type: String,
      default: "",
    },
  },
  // Enabling timestamps, which will automatically add createdAt and updatedAt fields
  { timestamps: true }
);

// Creating the model for the "User" collection using the schema defined above
const User = mongoose.model("User", userSchema);

// Exporting the User model to be used in other parts of the application
export default User;