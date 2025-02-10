//useAuthStore.js =>
// This file in a React project under the store folder is used to manage 
// the application's authentication-related state and actions. It leverages Zustand, 
// a state management library, to create a global state that can be accessed throughout 
// the application without prop drilling.

//Purpose-->
//Centralized State Management:
//Store and manage authentication-related states like the current user, loading states, 
// and API calls.

//Reusable Functions:
//Provides methods such as signup, login, logout, and updateProfile to handle authentication.

//Global Access:
//Enables any React component to access and manipulate authentication states by using the store.


// Importing the Zustand library to create a global state management store.
import { create } from "zustand";

// Importing the configured Axios instance for making HTTP requests.
import { axiosInstance } from "../lib/axios.js";

// Importing the toast library for displaying success/error notifications.
import toast from "react-hot-toast";

// Defining the base URL based on the environment (development or production).
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

//Importing the io function from the socket.io-client package, 
//which allows your frontend application to establish a WebSocket connection 
//with a backend server running socket.io.
import { io } from "socket.io-client";

// Creating the Zustand store for managing authentication-related state.
export const useAuthStore = create((set, get) => ({
  // State properties to manage authentication data and status.
  authUser: null, // Holds the authenticated user's information.
  isSigningUp: false, // Flag to indicate the signup process.
  isLoggingIn: false, // Flag to indicate the login process.
  isUpdatingProfile: false, // Flag to indicate the profile update process.
  isCheckingAuth: true, // Flag to indicate if authentication check is in progress.
  onlineUsers: [], // Stores the list of online users.
  socket: null, // Stores the active socket instance.

  // Method to check the user's authentication status.
  checkAuth: async () => {
    try {
      // API call to verify authentication status.
      const res = await axiosInstance.get("/auth/check");

      // Updating the store with authenticated user data.
      set({ authUser: res.data });

      // Establish a socket connection upon successful authentication.
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);

      // Reset authentication state on error.
      set({ authUser: null });
    } finally {
      // Indicate that the authentication check is complete.
      set({ isCheckingAuth: false });
    }
  },

  // Method to handle user signup.
  signup: async (data) => {
    set({ isSigningUp: true }); // Indicate signup in progress.
    try {
      // API request to create a new user.
      const res = await axiosInstance.post("/auth/signup", data);

      // Store user data on successful signup.
      set({ authUser: res.data });

      // Show success notification.
      toast.success("Account created successfully");

      // Establish a socket connection.
      get().connectSocket();
    } catch (error) {
      // Display error message received from the server.
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      // Reset signup state.
      set({ isSigningUp: false });
    }
  },

  // Method to handle user login.
  login: async (data) => {
    set({ isLoggingIn: true }); // Indicate login in progress.
    try {
      // API request to authenticate user.
      const res = await axiosInstance.post("/auth/login", data);

      // Store user data on successful login.
      set({ authUser: res.data });

      // Show success notification.
      toast.success("Logged in successfully");

      // Establish a socket connection.
      get().connectSocket();
    } catch (error) {
      // Display error message received from the server.
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      // Reset login state.
      set({ isLoggingIn: false });
    }
  },

  // Method to handle user logout.
  logout: async () => {
    try {
      // API request to log out the user.
      await axiosInstance.post("/auth/logout");

      // Clear authentication state.
      set({ authUser: null });

      // Show success notification.
      toast.success("Logged out successfully");

      // Disconnect socket connection.
      get().disconnectSocket();
    } catch (error) {
      // Display error message received from the server.
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  // Method to update the authenticated user's profile.
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true }); // Indicate profile update in progress.
    try {
      // API request to update user profile.
      const res = await axiosInstance.put("/auth/update-profile", data);

      // Update user data in store.
      set({ authUser: res.data });

      // Show success notification.
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in updateProfile:", error);

      // Display error message received from the server.
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      // Reset profile update state.
      set({ isUpdatingProfile: false });
    }
  },

  // Method to establish a socket connection.
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return; // Avoid duplicate connections.

    // Initialize socket connection with user ID.
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    socket.connect();

    // Store the socket instance in the state.
    set({ socket });

    // Listen for online users update.
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  // Method to disconnect the socket connection.
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));