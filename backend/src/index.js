// Importing the Express library to create and manage the server.
import express from "express";
// Importing the dotenv package to load environment variables from a .env file into process.env.
import dotenv from "dotenv";
// Importing authentication-related routes from the auth.route.js file.
import authRoutes from "./routes/auth.route.js";
// Importing the function to establish a connection to the database from the db.js file.
import { connectDB } from "./lib/db.js";
// Importing the cookie-parser middleware to parse cookies from incoming requests.
import cookieParser from "cookie-parser";
// Importing message-related routes from the message.route.js file.
import messageRoutes from "./routes/message.route.js";
// Importing the CORS middleware to enable Cross-Origin Resource Sharing for the application.
import cors from "cors";


// Creating an instance of the Express application.
// This instance `app` will be used to define routes, middleware, and handle HTTP requests.
const app = express();

//app.use()-->
    //A method in Express.js that adds middleware or routes to the application.
    //It ensures that any incoming request with a specific path is processed by 
    //the provided middleware or router.

// cors()-->
//  Enables Cross-Origin Resource Sharing (CORS), allowing a server to specify domains, 
//  headers, and methods that are permitted when making requests to it from a different origin.

        //origin: Defines the URL(s) allowed to make requests to the server. Here, it restricts 
        //access to only requests coming from http://localhost:5173.

        //credentials: Ensures cookies and authentication headers are included in requests made 
        //to the server. This is especially useful for sessions and secure communication.

//use this near the very top otherwise there was CORS error when uploading user profile image 
app.use(
    cors({
        // Specifies the allowed origin for cross-origin requests. 
        // In this case, only requests from "http://localhost:5173" are permitted.
      origin: "http://localhost:5173",
       // Allows credentials such as cookies, authorization headers, or TLS client certificates to be sent with the request.
      credentials: true,
    })
  );

//This is used for cloudinary image upload
//use this near the very top otherwise there was payload too large error when uploading user profile image
app.use(express.json({
    // Sets the maximum size of the request body to 10 megabytes.
    // Prevents excessively large payloads from overwhelming the server.
    limit: '10mb'
  }));

//.config(): This is a function provided by the dotenv module. 
// It reads the .env file (by default, it looks for a file named .env in the 
// root of your project) and loads the variables into the Node.js environment (process.env).
dotenv.config();

// Access the PORT environment variable from the .env file
const PORT = process.env.PORT;

// Middleware to parse JSON data in the request body.
// This is required to handle incoming JSON payloads in POST, PUT, or PATCH requests.
// Without this middleware, req.body will be undefined for JSON data.
app.use(express.json());

// Middleware to parse cookies from incoming requests and make them accessible via req.cookies.
// This is useful for handling cookies in the application, such as session tokens or user preferences.
app.use(cookieParser());

//// Mount the authentication-related routes to the base path "/api/auth".
// Any request that starts with "/api/auth" will be handled by the routes defined in "authRoutes".
    // For example:
    // - POST /api/auth/login -> Handles user login (defined in authRoutes)
    // - POST /api/auth/register -> Handles user registration (defined in authRoutes)
    // - and many others 
//authRoutes --> A router object
app.use("/api/auth", authRoutes);

// Mounting the `messageRoutes` router at the "/api/messages" path.
// Any routes defined in `messageRoutes` will be accessible under the "/api/messages" endpoint.
// For example, a GET request to "/api/messages" will trigger the corresponding route in `messageRoutes`.
app.use("/api/messages", messageRoutes);

app.listen(PORT,()=>{
    console.log("Server running on PORT "+PORT);
    connectDB();
})