// Importing the Express framework to create a new router instance.
import express from "express";
// Importing the middleware function to protect routes by ensuring only authenticated users can access them.
import { protectRoute } from "../middleware/auth.middleware.js";
// Importing the controller functions that handle the logic for message-related operations.
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

// Creating a new router instance to define routes specific to messages.
const router = express.Router();

// Route to fetch a list of users for the sidebar.
// This route is protected by `protectRoute` middleware, so only authenticated users can access it.
// `getUsersForSidebar` is the controller function that handles the logic and is 
// used to display all users except logged in user for chatting.
router.get("/users", protectRoute, getUsersForSidebar);

// Route to fetch messages exchanged with a specific user, identified by `:id` in the URL.
// This route is also protected by the `protectRoute` middleware.
// `getMessages` is the controller function that retrieves the messages.
router.get("/:id", protectRoute, getMessages);

// Route to send a new message to a specific user, identified by `:id` in the URL.
// Protected by the `protectRoute` middleware to ensure only authenticated users can send messages.
// `sendMessage` is the controller function that handles sending the message.
router.post("/send/:id", protectRoute, sendMessage);

// Exporting the router to make it available for use in the main application or other modules.
export default router;