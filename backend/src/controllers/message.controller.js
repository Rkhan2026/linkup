// Importing the User model to interact with the users collection in the database
import User from "../models/user.model.js";
// Importing the Message model to interact with the messages collection in the database
import Message from "../models/message.model.js";
// Importing the configured Cloudinary instance to handle image uploads
import cloudinary from "../lib/cloudinary.js";

// Controller function to get all users (except the logged-in user) for the sidebar
export const getUsersForSidebar = async (req, res) => {
  try {
    // Extracting the logged-in user's ID from the request object (set by middleware)
    const loggedInUserId = req.user._id;
     // Fetching all users from the database except the logged-in user (using `$ne` to exclude their ID)
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    // Responding with the list of users, excluding their passwords
    res.status(200).json(filteredUsers);
  } catch (error) {
      // Logging the error and sending an internal server error response if something goes wrong
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get all messages between the logged-in user and another user
export const getMessages = async (req, res) => {
  try {
     // Extracting the recipient user's ID from the URL parameters
    const { id: userToChatId } = req.params;
     // Extracting the logged-in user's ID from the request object (set by middleware)
    const myId = req.user._id;

    // Finding all messages between the logged-in user and the recipient
    const messages = await Message.find({
      $or: [
         // Messages where the logged-in user is the sender and the recipient is the receiver
        { senderId: myId, receiverId: userToChatId },
        // Messages where the logged-in user is the receiver and the recipient is the sender
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    // Responding with the list of messages
    res.status(200).json(messages);
  } catch (error) {
    // Logging the error and sending an internal server error response if something goes wrong
    console.log("Error In getMessages Controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to send a new message between the logged-in user and another user
export const sendMessage = async (req, res) => {
  try {
    // Destructuring text and image from the request body
    const { text, image } = req.body;
    // Extracting the recipient's user ID from the URL parameters
    const { id: receiverId } = req.params;
    // Extracting the logged-in user's ID from the request object (set by middleware)
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // If an image is provided, upload the image to Cloudinary and get the secure URL
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Creating a new message document in the database
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl, // If an image was uploaded, store the URL
    });

    // Saving the new message to the database
    await newMessage.save();

    //to do : realtime functionality comes here => socket.io
    
     // Responding with the newly created message
    res.status(201).json(newMessage);
  } catch (error) {
    // Logging the error and sending an internal server error response if something goes wrong
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};