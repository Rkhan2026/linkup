/*
Sidebar.jsx=>
It is imported and used in HomePage.jsx to display the list of contacts
*/

import { useEffect, useState } from "react"; // Import React hooks for state management and side effects
import { useChatStore } from "../store/useChatStore"; // Importing chat store to manage chat-related state
import { useAuthStore } from "../store/useAuthStore"; // Importing auth store to manage authentication-related state
import SidebarSkeleton from "./skeletons/SidebarSkeleton"; // Importing a skeleton loader for UI when data is loading
import { Users } from "lucide-react"; // Importing a user icon from lucide-react library

const Sidebar = () => {
  // Extracting functions and state variables from chat store
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  // Extracting online users from auth store
  const { onlineUsers } = useAuthStore();

  // Local state to track whether to show only online users
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  // Fetch the list of users when the component mounts
  useEffect(() => {
    getUsers(); // Calls getUsers function to fetch user data
  }, [getUsers]); // Runs only when `getUsers` function reference changes

  // Filter users based on the "Show Online Only" toggle state
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id)) // Show only online users
    : users; // Show all users if the filter is disabled

  // If users are still loading, display a skeleton loader
  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Sidebar Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" /> {/* Users icon */}
          <span className="font-medium hidden lg:block">Contacts</span> {/* Title visible only on larger screens */}
        </div>

        {/* Online Users Filter Toggle (Visible on larger screens) */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly} // Checkbox state based on showOnlineOnly
              onChange={(e) => setShowOnlineOnly(e.target.checked)} // Toggle state on change
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span> {/* Label text */}
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
          {/* Displays the number of online users (excluding the current user) */}
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id} // Unique key for each user
            onClick={() => setSelectedUser(user)} // Set the selected user on click
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              `}
          >
            {/* User Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"} // Show user profile pic or fallback avatar
                alt={user.name}
                className="size-12 object-cover rounded-full" // Style for circular profile picture
              />
              {onlineUsers.includes(user._id) && ( // If user is online, show online status indicator
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User Information (Only visible on larger screens) */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div> {/* Display user name */}
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"} {/* Show online/offline status */}
              </div>
            </div>
          </button>
        ))}

        {/* Show message if there are no filtered users */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar; // Exporting Sidebar component for use in other parts of the app