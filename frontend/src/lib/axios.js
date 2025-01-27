//axios.js =>
// This file in the lib folder under the frontend typically serves as a 
// centralized configuration for making HTTP requests in a React or similar frontend project. 
// This approach ensures consistency and simplifies API interactions throughout the application.

//Purpose and Benefits-->

//Centralized Configuration:
//All settings, such as base URL, headers, and other options, are defined in one place.
//This avoids redundancy and makes updates easy.

//Reusability:
//The configured axiosInstance can be imported and used in different parts of the application.

//Environment-Specific Configurations:
//Easily handles switching between development and production environments.

//Custom Middleware:
//Custom interceptors for request/response transformations and error handling can be defined.

// Importing the Axios library for making HTTP requests.
import axios from "axios";

//axios.create(): Creates a reusable Axios instance with default configuration settings.
//baseURL: Determines the root URL for all API calls, dynamically switching based on whether the application is running in development or production.
//import.meta.env.MODE: A Vite-specific environment variable that indicates the current mode (development or production).
//withCredentials: true: Ensures cookies, HTTP authentication headers, or other credentials are sent with cross-origin requests, which is useful for session-based authentication.
//axiosInstance: This configured Axios instance can now be imported and used throughout your application for making API calls.

// Creating an Axios instance with custom configuration settings.
export const axiosInstance = axios.create({
  // Setting the base URL for all HTTP requests based on the environment.
  // If the app is in development mode, the base URL is "http://localhost:5001/api".
  // Otherwise, in production, it defaults to "/api".
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",

  // Enabling the inclusion of credentials (e.g., cookies) in cross-origin requests.
  withCredentials: true,
});