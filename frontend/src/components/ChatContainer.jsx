/*
ChatContainer.jsx =>
This file is responsible for rendering and managing the chat interface in the application. 
It serves as the main chat window where users can send and receive messages. Here’s a breakdown 
of its usage and functionality:

Primary Uses of ChatContainer.jsx

Displays Messages
It fetches and renders messages between the authenticated user and the selected user.
Messages are formatted with timestamps and sender details.

Real-time Updates
Subscribes to new messages dynamically to keep the chat updated in real-time.
Unsubscribes when the component unmounts to prevent memory leaks.

Auto-scrolling
Automatically scrolls to the latest message whenever new messages are received.
Handles Message Loading State

Shows a loading skeleton (MessageSkeleton) when messages are being fetched.

User Interface Components
ChatHeader: Displays the chat header with user details.
MessageInput: Provides an input field for sending new messages.
Message List: Renders text messages and image attachments.
*/

import { useChatStore } from "../store/useChatStore"; // Importing the custom chat store to access chat-related state and actions
import { useEffect, useRef } from "react"; // useEffect for handling side effects, useRef for referencing DOM elements

import ChatHeader from "./Chatheader"; // Importing the chat header component for displaying conversation details
import MessageInput from "./MessageInput"; // Importing the message input component for sending messages
import MessageSkeleton from "./skeletons/MessageSkeleton"; // Importing a skeleton component for showing a loading state
import { useAuthStore } from "../store/useAuthStore"; // Importing the auth store to get the current authenticated user
import { formatMessageTime } from "../lib/utils"; // Importing a utility function to format message timestamps

const ChatContainer = () => {
  // Extracting chat-related state and actions from the chat store
  const {
    messages, // List of messages in the chat
    getMessages, // Function to fetch messages from the backend
    isMessagesLoading, // Boolean flag indicating if messages are loading
    selectedUser, // The user with whom the conversation is happening
    subscribeToMessages, // Function to enable real-time message subscription
    unsubscribeFromMessages, // Function to unsubscribe from real-time messages
  } = useChatStore();
  
  const { authUser } = useAuthStore(); // Extracting the authenticated user's details from auth store
  const messageEndRef = useRef(null); // Reference to the last message for auto-scrolling

  // Fetch messages when the selected user changes, and subscribe to real-time updates
  useEffect(() => {
    getMessages(selectedUser._id); // Fetch messages for the selected user
    subscribeToMessages(); // Enable real-time message updates

    return () => unsubscribeFromMessages(); // Cleanup: Unsubscribe when the component unmounts
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Auto-scroll to the latest message whenever messages update
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Display loading skeleton while messages are being fetched
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader /> {/* Display the chat header with user details */}

      {/* Container for chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id} // Unique key for each message
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef} // Attach ref to last message for auto-scroll
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png" // Use auth user's profile pic if sender is the current user
                      : selectedUser.profilePic || "/avatar.png" // Use recipient's profile pic otherwise
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            
            {/* Display timestamp of the message */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            
            {/* Message bubble containing text and optional image */}
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>} {/* Display message text if available */}
            </div>
          </div>
        ))}
      </div>
      
      <MessageInput /> {/* Message input field for sending new messages */}
    </div>
  );
};

export default ChatContainer; // Exporting the ChatContainer component for use in other parts of the app