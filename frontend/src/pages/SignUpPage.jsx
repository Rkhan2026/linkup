/*
SignUpPage.jsx=>
This page component is the sign-up page of the application, 
where users can create a new account. It includes a form for collecting user 
details and validation logic.
*/


import { useState } from "react"; // Importing React's useState hook to manage component state.
import { useAuthStore } from "../store/useAuthStore"; // Importing the authentication store to access signup method and state.
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react"; // Importing icons for user interface.
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation between pages.

import AuthImagePattern from "../components/AuthImagePattern"; // Importing the AuthImagePattern component to display an image pattern on the right side.
import toast from "react-hot-toast"; // Importing toast for displaying error/success messages.

const SignUpPage = () => {
  // Local state for controlling password visibility and managing form data.
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Extracting the signup function and isSigningUp state from the authentication store.
  const { signup, isSigningUp } = useAuthStore();

  // Validate the form input values before submitting the form.
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required"); // Check if the full name is empty.
    if (!formData.email.trim()) return toast.error("Email is required"); // Check if the email is empty.
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format"); // Validate the email format.
    if (!formData.password) return toast.error("Password is required"); // Check if the password is empty.
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters"); // Check if password length is less than 6 characters.

    return true;
  };

  // Handle the form submission.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    const success = validateForm(); // Validate the form data.

    if (success === true) signup(formData); // If validation passes, call the signup function with the form data.
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Form section */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and heading */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          {/* Sign-up form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" /> {/* Icon for full name input */}
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`} // Tailwind CSS classes for styling
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} // Update full name in form data.
                />
              </div>
            </div>

            {/* Email input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" /> {/* Icon for email input */}
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`} // Tailwind CSS classes for styling
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Update email in form data.
                />
              </div>
            </div>

            {/* Password input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" /> {/* Icon for password input */}
                </div>
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password input type
                  className={`input input-bordered w-full pl-10`} // Tailwind CSS classes for styling
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} // Update password in form data.
                />
                {/* Toggle visibility of password */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility on click.
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" /> // EyeOff icon when password is visible
                  ) : (
                    <Eye className="size-5 text-base-content/40" /> // Eye icon when password is hidden
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {/* Show a loading spinner when signing up */}
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> {/* Loading spinner */}
                  Loading...
                </>
              ) : (
                "Create Account" // Button text when not loading
              )}
            </button>
          </form>

          {/* Sign-in link if already have an account */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image pattern section */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;