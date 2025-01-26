/*
eslint.config.js =>
This file is used to configure ESLint, a tool that helps 
ensure your code follows certain coding standards and rules. ESLint can analyze 
JavaScript code and identify potential issues, such as syntax errors, stylistic issues, 
and potential bugs. This configuration file allows you to define the settings, rules, and 
plugins you want ESLint to use while linting your code.
*/

// Importing necessary modules and plugins for ESLint
import js from '@eslint/js' // Standard JavaScript ESLint rules
import globals from 'globals' // Provides global variables for various environments
import react from 'eslint-plugin-react' // ESLint plugin for React
import reactHooks from 'eslint-plugin-react-hooks' // ESLint plugin for React hooks
import reactRefresh from 'eslint-plugin-react-refresh' // ESLint plugin for React fast refresh support

export default [
  // Ignores the 'dist' directory from being linted
  { ignores: ['dist'] },

  // Configuration for linting JavaScript and JSX files
  {
    // Files to which this configuration applies
    files: ['**/*.{js,jsx}'],
    
    // Language options for ECMAScript
    languageOptions: {
      ecmaVersion: 2020, // Set the ECMAScript version to 2020
      globals: globals.browser, // Provides browser globals like 'window' and 'document'
      parserOptions: {
        ecmaVersion: 'latest', // Always use the latest ECMAScript version
        ecmaFeatures: { jsx: true }, // Enable JSX support
        sourceType: 'module', // Use ES Modules syntax for imports and exports
      },
    },

    // React settings for ESLint
    settings: { react: { version: '18.3' } }, // Specify React version for linting
    
    // Plugins to be used for linting
    plugins: {
      react, // ESLint plugin for React
      'react-hooks': reactHooks, // ESLint plugin for React hooks
      'react-refresh': reactRefresh, // ESLint plugin for React refresh
    },
    
    // Custom ESLint rules
    rules: {
      ...js.configs.recommended.rules, // Include recommended JavaScript rules
      ...react.configs.recommended.rules, // Include recommended React rules
      ...react.configs['jsx-runtime'].rules, // Include JSX runtime-specific React rules
      ...reactHooks.configs.recommended.rules, // Include recommended React hooks rules
      
      // Override or add custom rules
      'react/jsx-no-target-blank': 'off', // Allow using <a> tags with target="_blank"
      'react-refresh/only-export-components': [
        'warn', // Warn if only components are exported, with an exception for constant exports
        { allowConstantExport: true },
      ],
    },
  },
]