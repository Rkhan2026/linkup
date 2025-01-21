// Import the jsonwebtoken library for handling JWTs (JSON Web Tokens)
import jwt from "jsonwebtoken";

/**
 * Function to generate a JWT token and set it as a cookie in the response.
 *
 * @param {string} userId - The unique identifier for the user.
 * @param {object} res - The Express.js response object.
 * @returns {string} - The generated JWT token.
 */

export const generateToken = (userId, res) => {
   // Generate a JWT token with the user's ID as the payload.
  // The token is signed using the secret key from the environment variable.
  // It is set to expire in 7 days.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// Set the generated JWT token as a cookie in the response.
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (7 days).
    httpOnly: true, // Makes the cookie inaccessible to JavaScript on the client-side (prevents XSS attacks).
    sameSite: "strict",  //Ensures the cookie is sent only for same-site requests (prevents CSRF attacks).
    secure: process.env.NODE_ENV !== "development", // Sets the cookie to be transmitted over HTTPS only, unless in development mode.
  });
  
 // Return the generated token for potential further use.
  return token;
};