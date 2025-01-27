/*
ProfilePage.jsx=>
This file under the pages folder is a common practice 
to organize different views or pages of the application.

ProfilePage.jsx is placed under the pages folder because it represents a page that 
will be routed to by react-router-dom. This follows the practice of organizing components 
by their type (e.g., pages, components, hooks, etc.).
*/


import { useState } from "react"; // Importing useState hook from React to manage local state.
import { useAuthStore } from "../store/useAuthStore"; // Importing the useAuthStore hook for accessing authentication state and actions.
import { Camera, Mail, User } from "lucide-react"; // Importing icons from lucide-react for user profile, email, and camera.

const ProfilePage = () => {
  // Extracting authentication user data, update status, and updateProfile method from the auth store.
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  // Local state to manage the selected image for the profile picture upload.
  const [selectedImg, setSelectedImg] = useState(null);

  // Handle image file selection and upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the first file selected by the user.
    if (!file) return; // If no file is selected, exit.

    const reader = new FileReader(); // FileReader API to read the image as a base64 encoded string.

    reader.readAsDataURL(file); // Read the file as a data URL.

    reader.onload = async () => {
      const base64Image = reader.result; // Store the base64 string of the image once read.
      setSelectedImg(base64Image); // Update the local state with the selected image.
      await updateProfile({ profilePic: base64Image }); // Update the profile picture in the store or backend.
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          {/* Profile Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* Display the user's current profile picture or a default avatar */}
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"} // Shows selected image, user profile image, or default avatar.
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              {/* Avatar upload button */}
              <label
                htmlFor="avatar-upload" // Label for triggering file input (clicking this will open the file selector).
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                {/* Camera icon for uploading new profile picture */}
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*" // Only accept image files.
                  onChange={handleImageUpload} // Trigger handleImageUpload when a file is selected.
                  disabled={isUpdatingProfile} // Disable the file input if the profile is being updated.
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {/* Show a message indicating whether the image is uploading */}
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile details section */}
          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" /> {/* User icon */}
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p> {/* Display user's full name */}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" /> {/* Mail icon */}
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p> {/* Display user's email */}
            </div>
          </div>

          {/* Account Information Section */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              {/* Member Since */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span> {/* Display the date when the account was created */}
              </div>
              {/* Account Status */}
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span> {/* Display active status */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;