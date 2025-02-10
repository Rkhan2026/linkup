/*
useChatStore.js =>

This file is a Zustand store for managing the chat-related 
state and functions in a React application. It provides a centralized way to handle 
user interactions, message fetching, sending, and real-time updates using WebSockets. 

Below are some of its key use cases:

1. Managing Chat State Globally
Instead of lifting state up and passing it down as props, useChatStore allows the chat state to be accessible anywhere in the application.

2. Fetching and Displaying Messages
It provides a function to fetch messages when a user is selected.

3. Sending Messages
The sendMessage function allows sending messages to the selected user.

4. Real-Time Updates Using WebSockets
It subscribes to new messages when a user is selected and unsubscribes when the component unmounts.

5. Handling User Selection
The setSelectedUser function updates the current chat user.
*/

// Import necessary modules and dependencies
import { create } from "zustand"; // Zustand is a lightweight state management library for React.
import toast from "react-hot-toast"; // react-hot-toast is used for displaying notifications.
import { axiosInstance } from "../lib/axios"; // Importing a pre-configured Axios instance for API requests.
import { useAuthStore } from "./useAuthStore"; // Importing authentication-related state management from another Zustand store.

// Creating a Zustand store for managing chat-related state and functions
export const useChatStore = create((set, get) => ({
  // State variables
  messages: [], // Stores the list of messages for the selected user.
  users: [], // Stores the list of users the current user has messaged with.
  selectedUser: null, // Stores the currently selected user in the chat.
  isUsersLoading: false, // Boolean flag indicating whether user list is being fetched.
  isMessagesLoading: false, // Boolean flag indicating whether messages are being fetched.

  // Function to fetch the list of users the current user has messaged with
  getUsers: async () => {
    set({ isUsersLoading: true }); // Set loading state to true before API call
    try {
      const res = await axiosInstance.get("/messages/users"); // API request to get users
      set({ users: res.data }); // Store the fetched users in state
    } catch (error) {
      toast.error(error.response.data.message); // Show error notification if request fails
    } finally {
      set({ isUsersLoading: false }); // Set loading state to false after request completion
    }
  },

  // Function to fetch messages for the selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true }); // Set loading state to true before API call
    try {
      const res = await axiosInstance.get(`/messages/${userId}`); // API request to get messages for the given userId
      set({ messages: res.data }); // Store the fetched messages in state
    } catch (error) {
      toast.error(error.response.data.message); // Show error notification if request fails
    } finally {
      set({ isMessagesLoading: false }); // Set loading state to false after request completion
    }
  },

  // Function to send a message to the selected user
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get(); // Get current selected user and messages state
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData); // API request to send message
      set({ messages: [...messages, res.data] }); // Append the new message to the messages array
    } catch (error) {
      toast.error(error.response.data.message); // Show error notification if request fails
    }
  },

  // Function to subscribe to real-time message updates using WebSockets
  subscribeToMessages: () => {
    const { selectedUser } = get(); // Get the currently selected user
    if (!selectedUser) return; // If no user is selected, do nothing

    const socket = useAuthStore.getState().socket; // Get the socket instance from authentication store

    // Listen for "newMessage" event from the WebSocket
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id; // Check if message is from the selected user
      if (!isMessageSentFromSelectedUser) return; // Ignore messages from other users

      set({
        messages: [...get().messages, newMessage], // Append new message to state
      });
    });
  },

  // Function to unsubscribe from real-time message updates
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket; // Get the socket instance
    socket.off("newMessage"); // Remove listener for "newMessage" event
  },

  // Function to set the selected user in state
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));