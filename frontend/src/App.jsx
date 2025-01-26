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

import React from 'react'

const App = () => {
  return (
    <div className='text-red-500'>Hello World</div>
  )
}

export default App