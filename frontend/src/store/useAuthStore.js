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

// Creating the Zustand store for managing authentication-related state.
export const useAuthStore = create((set, get) => ({
  // State properties to manage authentication data and status.
  authUser: null, // Holds the authenticated user's information.
  isSigningUp: false, // Indicates if the signup process is ongoing.
  isLoggingIn: false, // Indicates if the login process is ongoing.
  isUpdatingProfile: false, // Indicates if the profile update process is ongoing.
  isCheckingAuth: true, // Indicates if the authentication check is ongoing.
  onlineUsers: [],


  // Method to check the user's authentication status.
  checkAuth: async () => {
    try {
      // Making an API call to check if the user is authenticated.
      const res = await axiosInstance.get("/auth/check");

      // Updating the state with the authenticated user's data.
      set({ authUser: res.data });
    } catch (error) {
      // Logging any errors and resetting the authUser state to null.
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      // Setting isCheckingAuth to false to indicate the process has completed.
      set({ isCheckingAuth: false });
    }
  },

  // Method to sign up a new user.
  signup: async (data) => {
    set({ isSigningUp: true }); // Setting isSigningUp to true during the signup process.
    try {
      // Sending a POST request to the signup endpoint with user data.
      const res = await axiosInstance.post("/auth/signup", data);

      // Storing the newly created user's data in the state.
      set({ authUser: res.data });

      // Displaying a success notification.
      toast.success("Account created successfully");
    } catch (error) {
      // Displaying an error notification with the message from the server.
      toast.error(error.response.data.message);
    } finally {
      // Setting isSigningUp to false to indicate the process has ended.
      set({ isSigningUp: false });
    }
  },

  // Method to log in a user.
  login: async (data) => {
    set({ isLoggingIn: true }); // Setting isLoggingIn to true during the login process.
    try {
      // Sending a POST request to the login endpoint with user credentials.
      const res = await axiosInstance.post("/auth/login", data);

      // Storing the authenticated user's data in the state.
      set({ authUser: res.data });

      // Displaying a success notification.
      toast.success("Logged in successfully");
    } catch (error) {
      // Displaying an error notification with the message from the server.
      toast.error(error.response.data.message);
    } finally {
      // Setting isLoggingIn to false to indicate the process has ended.
      set({ isLoggingIn: false });
    }
  },

  // Method to log out the user.
  logout: async () => {
    try {
      // Sending a POST request to the logout endpoint.
      await axiosInstance.post("/auth/logout");

      // Resetting the authUser state to null upon logout.
      set({ authUser: null });

      // Displaying a success notification.
      toast.success("Logged out successfully");
    } catch (error) {
      // Displaying an error notification with the message from the server.
      toast.error(error.response.data.message);
    }
  },

  // Method to update the authenticated user's profile.
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true }); // Setting isUpdatingProfile to true during the update process.
    try {
      // Sending a PUT request to the update-profile endpoint with updated data.
      const res = await axiosInstance.put("/auth/update-profile", data);

      // Updating the authUser state with the new profile data.
      set({ authUser: res.data });

      // Displaying a success notification.
      toast.success("Profile updated successfully");
    } catch (error) {
      // Logging errors and displaying an error notification.
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      // Setting isUpdatingProfile to false to indicate the process has ended.
      set({ isUpdatingProfile: false });
    }
  },
}));