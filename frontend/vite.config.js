//The vite.config.js file is used to configure Vite, a 
// tool that helps you build and develop modern web apps quickly. It allows you 
// to customize how Vite behaves when building your project.

//Simple Explanation:
  //Vite Plugins:
  //React Plugin (@vitejs/plugin-react): This plugin helps Vite understand and work with React code (like JSX) in your project.
  //Tailwind CSS Plugin (@tailwindcss/vite): This plugin makes sure Tailwind CSS works properly in your project.
  
  //Plugins Array:
  //You use the plugins array to tell Vite which plugins to use in your project. 
  //In your case, you're using two plugins: one for React and one for Tailwind CSS.
  
  //Customizing Build:
  //You can add more settings in the vite.config.js file if you need to change things 
  //like how the server runs or how your project gets built.

// Import necessary functions and plugins
import { defineConfig } from 'vite' // Vite's configuration function
import react from '@vitejs/plugin-react' // Vite plugin for React support
import tailwindcss from '@tailwindcss/vite' /// Vite plugin for Tailwind CSS support

// https://vite.dev/config/

// Export the Vite configuration object
export default defineConfig({
  // Define the plugins array to include React and Tailwind CSS plugins
  plugins: [react() // This plugin enables React support for Vite projects
     , tailwindcss()  // This plugin integrates Tailwind CSS with Vite
    ],
})
