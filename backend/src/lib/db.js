//ib
//Purpose: A generic folder for reusable utility functions, helper classes, or configurations.
//Role: Centralized for functionality that can be reused across multiple parts of the project, 
    // such as database connection logic, token generators, or logging mechanisms.
//Example: db.js for setting up a database connection or logger.js for logging errors or events.

import mongoose from "mongoose";

// Function to establish a connection to the MongoDB database
export const connectDB = async () => {
    try {
        // Attempt to connect to the database using the MongoDB URI stored in the environment variable
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        // Log a success message if the connection is successful, including the host of the connection
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Catch any errors during the connection process and log the error message
        console.log("MongoDB Connection Error:", error);
    }
}