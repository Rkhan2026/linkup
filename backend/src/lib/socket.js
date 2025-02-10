/*socket.js =>
This socket.js file sets up a WebSocket server using socket.io, allowing 
real-time bidirectional communication between the server and connected clients. 
Below are its key functionalities:

1. Manages Real-Time Connections
When a user connects, their socket ID is stored in userSocketMap.
When a user disconnects, their socket ID is removed.

2. Tracks Online Users
The server keeps track of online users using userSocketMap, where each userId 
is mapped to a socketId.
Whenever a user connects or disconnects, the updated list of online users 
is sent to all connected clients.

3. Enables Real-Time Messaging (or Other Interactions)
The function getReceiverSocketId(userId) allows 
retrieving the socket ID of a specific user.
This can be used in a chat application to send messages to 
specific users in real time.

4. Supports a Frontend Client
The cors option allows cross-origin requests from http://localhost:5173, 
which is typically a frontend client running on Vite or React.
*/

import { Server } from "socket.io";
import http from "http";
import express from "express";

// Create an Express app
// Creating an instance of the Express application.
// This instance `app` will be used to define routes, middleware, and handle HTTP requests.
const app = express();

// Create an HTTP server and attach the Express app
const server = http.createServer(app);

// Initialize a new instance of Socket.IO and enable CORS for the frontend
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Allow connections from this origin
  },
});

// Function to get the socket ID of a specific user
export function getReceiverSocketId(userId) {
  return userSocketMap[userId]; // Retrieve the socket ID of the user
}

// Used to store the mapping of online users and their socket IDs
const userSocketMap = {}; // Format: { userId: socketId }

// Event listener for new client connections
io.on("connection", (socket) => {
  console.log("A User Connected", socket.id); // Log when a user connects

  // Retrieve the user ID from the query parameters
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id; // Store the user ID and socket ID

  // Broadcast the updated list of online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Event listener for client disconnection
  socket.on("disconnect", () => {
    console.log("A User Disconnected", socket.id); // Log when a user disconnects
    delete userSocketMap[userId]; // Remove the user from the online users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update all clients
  });
});

// Export the necessary modules for use in other parts of the application
export { io, app, server };