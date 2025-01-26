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

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
