/*
message.controller.js =>
This file is responsible for handling message-related operations in a chat application. 
It interacts with the database to manage user messages, integrates with Cloudinary for 
image uploads, and uses Socket.IO for real-time messaging. Here’s what it does:

Functions in message.controller.js

getUsersForSidebar
Fetches all users from the database except the logged-in user.
Used to populate the sidebar with available users for chat.

getMessages
Retrieves all messages exchanged between the logged-in user and a selected user.
Queries the database for messages where either the sender or receiver matches the logged-in user.

sendMessage
Allows the logged-in user to send a message to another user.
Supports both text and image messages (uploads images to Cloudinary).
Saves the message in the database.
Uses Socket.IO to emit the message in real-time to the recipient if they are online.
*/

// Importing the User model to interact with the users collection in the database
import User from "../models/user.model.js";
// Importing the Message model to interact with the messages collection in the database
import Message from "../models/message.model.js";
// Importing the configured Cloudinary instance to handle image uploads
import cloudinary from "../lib/cloudinary.js";

// Importing socket utility functions for real-time messaging
import { getReceiverSocketId, io } from "../lib/socket.js";

/**
 * Controller function to fetch all users except the logged-in user
 * for displaying in the chat sidebar.
 */
export const getUsersForSidebar = async (req, res) => {
  try {
    // Extract the logged-in user's ID from the request object (set by authentication middleware)
    const loggedInUserId = req.user._id;

    // Fetch all users from the database except the logged-in user
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    // Send the list of users (excluding their passwords) as the response
    res.status(200).json(filteredUsers);
  } catch (error) {
    // Log the error and return a 500 response in case of server error
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Controller function to retrieve all messages exchanged between the logged-in user
 * and a specific recipient user.
 */
export const getMessages = async (req, res) => {
  try {
    // Extract recipient user's ID from URL parameters
    const { id: userToChatId } = req.params;
    // Extract the logged-in user's ID from the request object
    const myId = req.user._id;

    // Fetch messages where the logged-in user is either the sender or the receiver
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId }, // Sent messages
        { senderId: userToChatId, receiverId: myId }, // Received messages
      ],
    });

    // Respond with the list of messages
    res.status(200).json(messages);
  } catch (error) {
    // Log error and return a 500 response in case of server failure
    console.log("Error In getMessages Controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller function to send a new message from the logged-in user to a recipient.
 * Supports text messages and image uploads via Cloudinary.
 */
export const sendMessage = async (req, res) => {
  try {
    // Extract message text and image (if any) from the request body
    const { text, image } = req.body;
    // Extract recipient's user ID from the URL parameters
    const { id: receiverId } = req.params;
    // Extract the sender's user ID from the request object
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // If an image is provided, upload it to Cloudinary and retrieve the secure URL
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Create a new message document to store in the database
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl, // Store the image URL if uploaded
    });

    // Save the new message to the database
    await newMessage.save();    

    // Respond with the newly created message object
    res.status(201).json(newMessage);

    // Get the receiver's socket ID (for real-time message delivery)
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // Emit the new message to the recipient's socket in real time
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
  } catch (error) {
    // Log error and return a 500 response in case of server failure
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};