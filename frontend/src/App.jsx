/*
App.jsx (or sometimes App.js) =>
This is typically the root component of your application. 
It serves as the entry point for rendering your entire component tree. Most React 
applications have an App.jsx file that contains the overall structure of the app, 
including layout, routing, and other elements that are common across different parts of the app. 

Key Uses of App.jsx in React-->

Root Component: App.jsx is usually the root component that contains all other components. 
It acts as the starting point for rendering your entire React application.

Setting Up Routing: If your app uses React Router for navigation, the routes are 
typically defined in App.jsx. You would define which components should be displayed for 
different URL paths.

Global Layout: App.jsx often includes layout-related components, such as headers, 
footers, sidebars, etc., that are shared across pages or views in the app.

State Management: App.jsx might manage state that is shared across child components or 
pass down props to its children. You might also connect it to a global state management 
solution like Redux or Context API.

Application Logic: This is where you could handle key logic, such as component mounting, 
lifecycle methods, and any necessary data fetching. You would pass data to child components 
as props.
*/

import React, { useEffect } from "react"; 
// Importing React and the useEffect hook to handle side effects like checking authentication on mount.

import Navbar from "./components/Navbar"; 
// Importing the Navbar component to be displayed on all pages.

import HomePage from "./pages/HomePage"; 
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
// Importing different page components to be rendered based on the route.

import { Routes, Route, Navigate } from "react-router-dom"; 
// Importing routing functionalities from React Router for navigation.

import { useAuthStore } from "./store/useAuthStore"; 
// Importing custom authentication store (zustand store) to manage user authentication state.

import { Loader } from "lucide-react"; 
// Importing a loader icon from Lucide React to display while checking authentication status.

import { useThemeStore } from "./store/useThemeStore"; 
// Importing theme store to manage the application's theme.

import { Toaster } from "react-hot-toast"; 
// Importing toast notifications for displaying messages.

const App = () => {
  // Extracting authentication-related state and functions from the auth store.
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  
  // Extracting theme state from the theme store.
  const { theme } = useThemeStore();

  // useEffect hook to check authentication status when the component mounts.
  useEffect(() => {
    checkAuth(); // Calls the checkAuth function to verify user authentication status.
  }, [checkAuth]); // Runs the effect when checkAuth function reference changes.

  console.log({ authUser }); // Logging the authUser state for debugging purposes.

  // If authentication is still being checked and no user is authenticated, show a loading spinner.
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    // Applying the theme dynamically using the data-theme attribute.
    <div data-theme={theme}> 
      
      {/* Rendering the Navbar component, which remains consistent across pages */}
      <Navbar />

      {/* Defining application routes using React Router */}
      <Routes>
        {/* If authenticated, show HomePage; otherwise, redirect to login */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />

        {/* If not authenticated, show SignUpPage; otherwise, redirect to HomePage */}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />

        {/* If not authenticated, show LoginPage; otherwise, redirect to HomePage */}
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />

        {/* Always allow access to SettingsPage */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* If authenticated, show ProfilePage; otherwise, redirect to login */}
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      {/* Displaying toast notifications for user feedback */}
      <Toaster />
    </div>
  );
};

export default App; // Exporting the App component to be used in index.js or main entry file.