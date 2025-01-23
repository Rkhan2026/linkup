//routes
//Purpose: Stores route definitions for the application.
//Role: Defines endpoints for various features or APIs of the app, 
      //mapping specific URL paths to their respective controllers.
//Example: A user.auth.route.js file might define routes like POST /signup.

import express from "express";
// Importing the login, logout, signup and update profile functions from the auth.controller.js file
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

// Initialize a new router object from Express to define routes
const router = express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;