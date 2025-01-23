//controllers
//Purpose: This folder typically contains logic for handling incoming requests and responses.
//Role: Controllers act as intermediaries between the routes and the models. They 
     // process incoming data (from routes), call models for data manipulation, and send 
     // appropriate responses back to the client.
//Example: If there’s an API for user registration, 
// the userController.js might contain a function to handle user creation.


// Import the User model to interact with the database for user-related operations.
import User from "../models/user.model.js";
// Import the utility function to generate a JWT token.
import { generateToken } from "../lib/utils.js";
// Import bcrypt for hashing passwords securely.
import bcrypt from "bcryptjs";

// Importing the configured Cloudinary instance from the `cloudinary.js` file located in the `lib` directory.
// This instance is used to interact with Cloudinary's API for uploading, managing, 
// and accessing media assets like images and videos.
import cloudinary from "../lib/cloudinary.js";


/**
 * Controller for user signup.
 * Handles creating a new user, hashing the password, and generating a JWT token.
 *
 * @param {object} req - The Express.js request object containing user data in the body.
 * @param {object} res - The Express.js response object for sending responses.
 */

export const signup = async (req,res)=>{
     // Extract fullName, email, and password from the request body.
     const { fullName, email, password } = req.body;
     try {
           // Validate that all required fields are provided.
       if (!fullName || !email || !password) {
         return res.status(400).json({ message: "All fields are required" });
       }
   
        // Validate that the password length is at least 6 characters.
       if (password.length < 6) {
         return res.status(400).json({ message: "Password must be at least 6 characters" });
       }

          // Check if a user with the provided email already exists in the database.
       const user = await User.findOne({ email });
       if (user) return res.status(400).json({ message: "Email already exists" });

       
      // Generate a salt for hashing the password.
       const salt = await bcrypt.genSalt(10);
        // Hash the user's password with the generated salt.
       const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object with the provided and hashed data.
       const newUser = new User({
          fullName,
          email,
          password: hashedPassword,
        });

     // If the new user is successfully created:
        if (newUser) {
           // Generate a JWT token and set it in the response cookies.
          generateToken(newUser._id, res);
          // Save the new user to the database.
          await newUser.save();
    
          // Respond with the new user's information (excluding sensitive data like the password).
          res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
          });
        } else {
          // If the user creation fails, respond with an error.
          res.status(400).json({ message: "Invalid User Data" });
        }
      } catch (error) {
          // Log any errors to the server console for debugging.
        console.log("Error In SignUp Controller", error.message);
        // Respond with a 500 status code for server errors.
        res.status(500).json({ message: "Internal Server Error" });
      }
};

// Controller function to handle user login
export const login = async (req, res) => {
  // Destructuring email and password from the request body
  const { email, password } = req.body;
  try {
    // Finding a user by the email provided in the login form
    const user = await User.findOne({ email });

  // If no user is found with that email, return an error
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Comparing the provided password with the stored password using bcrypt
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // If the password doesn't match, return an error
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generating a token for the user and sending it as a cookie
    generateToken(user._id, res);

    // Responding with user information (excluding password) on successful login
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    // Handling any errors during the login process
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to handle user logout
export const logout = (req, res) => {
  try {
     // Clearing the JWT cookie to log the user out
    res.cookie("jwt", "", { maxAge: 0 });
     // Responding with a success message after logout
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
     // Handling any errors during the logout process
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to update the user's profile picture
export const updateProfile = async (req, res) => {
  try {
     // Extracting the profile picture URL from the request body
    const { profilePic } = req.body;
    // Getting the user ID from the request object
    const userId = req.user._id;

     // Checking if the profile pic is provided in the request
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    // Uploading the profile picture to Cloudinary and getting the URL
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Updating the user's profile picture in the database with the Cloudinary URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

      // Responding with the updated user information
    res.status(200).json(updatedUser);
  } catch (error) {
     // Handling any errors during the profile update process
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to check if the user is authenticated after page refresh
export const checkAuth = (req, res) => {
  try {
  // Responding with the user data if the user is authenticated 
  // (this comes from the `protectRoute` middleware)
    res.status(200).json(req.user);
  } catch (error) {
     // Handling any errors during the checkAuth process
    console.log("Error In checkAuth Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};