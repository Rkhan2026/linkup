/*
main.jsx (or sometimes index.jsx) =>
This file is typically the entry point for the React application. It is where 
the root of the React component tree is rendered to the DOM, and it often includes 
the setup for things like routing, global state management, and applying any global 
CSS styles or providers.

Typical Structure and Usage of main.jsx-->

Rendering the React App: The primary role of main.jsx is to render the root component of 
the application into the HTML file (usually index.html). This is done using 
ReactDOM.render() or createRoot().render() (for React 18 and later).

Global Providers: In many React applications, main.jsx is where global providers 
(like React Router, Redux, Context API, etc.) are wrapped around the root component 
to provide context and manage state across the entire app.

CSS and Styles: It is common to import global styles in main.jsx, such as a global CSS 
file, or configure libraries like tailwindcss if used in the project.
*/


// Enables additional checks and warnings for development builds.
import { StrictMode } from 'react'; 
// Allows rendering the React app into the root DOM element.
import { createRoot } from 'react-dom/client'; 
// Enables routing in the app using react-router.
import { BrowserRouter } from "react-router-dom"; 
// Importing the global styles for the application.
import './index.css'; 
// Importing the main App component of the application.
import App from './App.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/* StrictMode helps identify potential problems in the app during development */}
      <BrowserRouter>
          {/* BrowserRouter is used to enable routing with the browser's history API */}
          <App />
          {/* The main App component is rendered inside the BrowserRouter for routing */}
      </BrowserRouter>
  </StrictMode>
);