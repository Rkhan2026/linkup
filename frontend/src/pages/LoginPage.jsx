/*
The LoginPage.jsx is a component that is typically used to handle user authentication 
for logging into an application. It provides a form where users can enter their credentials 
(such as email and password) to sign in to the app. Here’s a breakdown of its key purposes:
*/


import { useState } from "react"; // Importing useState hook from React to manage local state.
import { useAuthStore } from "../store/useAuthStore"; // Importing the useAuthStore hook to access login method and state.
import AuthImagePattern from "../components/AuthImagePattern"; // Importing the AuthImagePattern component for displaying an image pattern on the right side.
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation between pages.
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react"; // Importing icons for the form inputs.

const LoginPage = () => {
  // Local state to manage password visibility and form input data.
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Extracting the login method and isLoggingIn state from the authentication store.
  const { login, isLoggingIn } = useAuthStore();

  // Handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior.
    login(formData); // Call the login function from the auth store with the form data.
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Heading */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" /> {/* Message icon */}
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1> {/* Main heading */}
              <p className="text-base-content/60">Sign in to your account</p> {/* Subheading */}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" /> {/* Mail icon */}
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`} // Styling for the input
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Update email in form data.
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" /> {/* Lock icon */}
                </div>
                <input
                  type={showPassword ? "text" : "password"} // Toggle between password and text input for password visibility.
                  className={`input input-bordered w-full pl-10`} // Styling for the input
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} // Update password in form data.
                />
                {/* Button to toggle password visibility */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility when clicked.
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" /> // EyeOff icon when password is visible
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" /> // Eye icon when password is hidden
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {/* Show loading spinner while logging in */}
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> {/* Loading spinner */}
                  Loading...
                </>
              ) : (
                "Sign in" // Button text when not loading
              )}
            </button>
          </form>

          {/* Link to Sign-up page */}
          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};

export default LoginPage;