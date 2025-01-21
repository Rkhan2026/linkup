import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();

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

//app.use()://A method in Express.js that adds middleware or routes to the application.
            //It ensures that any incoming request with a specific path is processed by 
            //the provided middleware or router.
//// Mount the authentication-related routes to the base path "/api/auth".
// Any request that starts with "/api/auth" will be handled by the routes defined in "authRoutes".
    // For example:
    // - POST /api/auth/login -> Handles user login (defined in authRoutes)
    // - POST /api/auth/register -> Handles user registration (defined in authRoutes)
//authRoutes --> A router object
app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    console.log("Server running on PORT "+PORT);
    connectDB();
})