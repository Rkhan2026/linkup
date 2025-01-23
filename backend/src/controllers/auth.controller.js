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

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};