//routes
//Purpose: Stores route definitions for the application.
//Role: Defines endpoints for various features or APIs of the app, 
      //mapping specific URL paths to their respective controllers.
//Example: A user.auth.route.js file might define routes like POST /signup.

import express from "express";

// Importing functions from the `auth.controller.js` file, which contains the logic for 
// authentication-related operations. These functions will be used to handle various 
// authentication tasks in the application.

// Function to verify if the user is authenticated, often used for route protection.
// Function to handle user login by validating credentials and generating tokens or sessions.
// Function to handle user logout by clearing tokens or sessions.
// Function to handle user registration by creating a new user account.
// Function to update the user's profile information, such as name, email, or password.
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";

// Importing the `protectRoute` middleware from the `auth.middleware.js` file.
// This middleware is used to restrict access to certain routes, ensuring that only authenticated users can access them.
// It typically verifies authentication tokens or session details to allow or deny access.
import { protectRoute } from "../middleware/auth.middleware.js";

// Initialize a new router object from Express to define routes
const router = express.Router();

// Defining a POST route for user signup, which triggers the `signup` controller function.
// This route will handle new user registrations by collecting the user's details and creating an account.
router.post("/signup",signup);


// Defining a POST route for user login, which triggers the `login` controller function.
// This route will authenticate the user by verifying their credentials (username/password) and provide a session or token.
router.post("/login",login);

// Defining a POST route for user logout, which triggers the `logout` controller function.
// This route will log out the user by clearing their session or token.
router.post("/logout",logout);

// Defining a PUT route for updating the user's profile, which triggers the `updateProfile` controller function.
// This route is protected by the `protectRoute` middleware, ensuring only authenticated users can update their profiles.
router.put("/update-profile", protectRoute, updateProfile);

// Defining a GET route to check the user's authentication status, which triggers the `checkAuth` 
// controller function. This route is also protected by the `protectRoute` 
// middleware, so only authenticated users can check their status.
// This checkAuth function is called whenever the page is refreshed by user
// so it decides whether thr user is authenticated so it will either take user to login page if not
// authenticated or the profile page.
router.get("/check", protectRoute, checkAuth);

// Exporting the router so it can be used in the main application or other modules.
export default router;