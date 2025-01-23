/* 
auth.middleware.js =>
    This file typically contains middleware functions that manage authentication and 
    authorization processes in a Node.js/Express application. These middlewares are designed to 
    ensure that only authenticated users can access specific routes or resources, and they often 
    verify the user's identity using methods like JWT tokens, session cookies, or OAuth tokens.

Common Uses of auth.middleware.js
    1. Protect Routes
    One of the main purposes of the auth.middleware.js file is to protect certain routes 
    that require users to be logged in or authenticated. For instance, middleware like 
    protectRoute checks if the user has a valid token and verifies it before allowing 
    access to sensitive routes.

    2. Verify Authentication
    It contains functions that validate JWT tokens or session cookies, ensuring that the 
    request is made by an authenticated user. This is typically done by checking the token 
    in the request headers or cookies and verifying it with a secret key.

    3. User Information Retrieval
    Once the user is authenticated, middleware often retrieves the user's data 
    (such as their ID, roles, and permissions) from the database and makes it available 
    for use in the request object (req.user). This allows route handlers to access user details 
    and enforce further authorization checks.
*/

// Importing the `jsonwebtoken` library to verify the JWT token.
import jwt from "jsonwebtoken";
// Importing the `User` model to interact with the user data in the database.
import User from "../models/user.model.js";

// `protectRoute` middleware to protect routes that require authentication.
export const protectRoute = async (req, res, next) => {
  try {
    // Extracting the JWT token from the cookies sent with the request.
    const token = req.cookies.jwt;

     // If no token is provided, return an unauthorized error response.
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // Verifying the token using the secret key stored in the environment variable.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is invalid or can't be decoded, return an unauthorized error response.
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

     // Finding the user associated with the decoded userId in the database, excluding the password field.
    const user = await User.findById(decoded.userId).select("-password");

     // If no user is found with the decoded userId, return a "user not found" response.
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

     // Attaching the found user to the `req` object, so that it can be accessed in route handlers.
    req.user = user;

    // Passing control to the next middleware or route handler.
    next();
  } catch (error) {
     // Logging any errors that occur during the middleware process.
    console.log("Error In protectRoute Middleware: ", error.message);
    // Sending a generic server error response in case of any unexpected issues.
    res.status(500).json({ message: "Internal Server Error" });
  }
};