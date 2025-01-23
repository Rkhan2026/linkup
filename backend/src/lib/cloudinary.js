// Importing the Cloudinary SDK and aliasing it as `cloudinary` for ease of use.
import { v2 as cloudinary } from "cloudinary";

// Importing the `dotenv` library to load environment variables from a .env file.
import { config } from "dotenv";

// Calling the `config` function from `dotenv` to load the environment variables 
// from the .env file into `process.env`.
config();

// Configuring Cloudinary with the credentials stored in environment variables.
// This ensures sensitive information like API keys is not hardcoded in the codebase.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,// The Cloudinary cloud name, loaded from the .env file.
  api_key: process.env.CLOUDINARY_API_KEY,// The Cloudinary API key, loaded from the .env file.
  api_secret: process.env.CLOUDINARY_API_SECRET,// The Cloudinary API secret, loaded from the .env file.
});

// Exporting the configured `cloudinary` object so it can be used in other parts of the application.
export default cloudinary;