/*The useThemeStore.js file in the store folder is used to manage the theme state in 
a React application using Zustand, a lightweight state management library. Here's why it's 
structured this way:

Purpose of useThemeStore.js-->
Centralized Theme State Management:
Instead of passing theme props manually across components, Zustand provides a global store to manage theme state.

Persistent Theme Selection:
The selected theme is stored in localStorage, so when the user refreshes the page, the theme remains the same.

Simplified State Updates:
The setTheme function updates both Zustand state and localStorage in one place.

Why localStorage is used ?
Using localStorage for theme persistence ensures that the selected theme remains the 
same even after the user refreshes the page or revisits the application later.

Reasons for Using localStorage for Theme-->
1. Persistent User Experience
If a user selects a theme, it should remain the same when they come back.
Without localStorage, the theme would reset to the default every time the page reloads.

2. No Need for Backend Storage
localStorage is a simple, lightweight way to store user preferences without requiring a database 
or API calls. Since theme selection is a UI preference, it doesn’t need to be stored on a server.

3. Fast and Efficient
localStorage works synchronously, meaning the data is instantly available.
It avoids unnecessary state re-fetching and API requests.

4. Works Without Authentication
If the user is not logged in (or if the app has no authentication system), localStorage 
still retains their theme preference.
*/

// Import the create function from Zustand, a lightweight state management library
import { create } from "zustand";

// Create a Zustand store for managing the application's theme
export const useThemeStore = create((set) => ({
  // Initialize the theme state by checking localStorage for a saved theme
  // If no theme is found, default to "coffee"
  theme: localStorage.getItem("chat-theme") || "coffee",

  // Function to update the theme
  setTheme: (theme) => {
    // Save the selected theme to localStorage for persistence across page reloads
    localStorage.setItem("chat-theme", theme);

    // Update the Zustand state with the new theme
    set({ theme });
  },
}));