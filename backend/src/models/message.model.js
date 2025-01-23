// Importing the Mongoose library for creating and managing MongoDB schemas and models.
import mongoose from "mongoose";

// Defining the schema for the `Message` collection in the MongoDB database.
// This schema outlines the structure of a message document.
const messageSchema = new mongoose.Schema(
  {
    // `senderId` stores the ID of the user sending the message.
    // It references the `User` collection to establish a relationship between messages and users.
    senderId: {
      type: mongoose.Schema.Types.ObjectId,// ObjectId type for referencing another document.
      ref: "User",// Refers to the `User` model.
      required: true,// Ensures this field must be provided.
    },
    // `receiverId` stores the ID of the user receiving the message.
    // Like `senderId`, it references the `User` collection.
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     // `text` field stores the content of the message as a string.
    text: {
      type: String,// Optional field for textual messages.
    },
      // `image` field stores the URL or path of an image, if the message contains one.
    image: {
      type: String,// Optional field for image messages.
    },
  },
   // Adding timestamps to automatically store `createdAt` and `updatedAt` fields for each document.
  { timestamps: true }
);

// Creating the `Message` model based on the defined schema.
// This model provides an interface to interact with the `messages` collection in MongoDB.
const Message = mongoose.model("Message", messageSchema);

// Exporting the `Message` model to use it in other parts of the application.
export default Message;