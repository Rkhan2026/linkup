/**
 * ChatHeader Component
 * Displays the selected user's profile picture, name, and online status.
 * Also includes a close button to deselect the user and return to the main view.
 */

import { X } from "lucide-react"; // Importing the close (X) icon from lucide-react
import { useAuthStore } from "../store/useAuthStore"; // Importing authentication store to get online users
import { useChatStore } from "../store/useChatStore"; // Importing chat store to manage selected user state

const ChatHeader = () => {
  // Extract selected user and function to update selected user from chat store
  const { selectedUser, setSelectedUser } = useChatStore();

  // Extract online users from auth store to determine the user's status
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        {/* Left Section: User Avatar and Info */}
        <div className="flex items-center gap-3">
          {/* Avatar Section */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} // Display user profile picture or default avatar
                alt={selectedUser.fullName} 
              />
            </div>
          </div>

          {/* User Information */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3> {/* Display user's name */}
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"} {/* Show online/offline status */}
            </p>
          </div>
        </div>

        {/* Right Section: Close Chat Button */}
        <button onClick={() => setSelectedUser(null)}> {/* Clears the selected user when clicked */}
          <X /> {/* Close icon (X) from lucide-react */}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader; // Exporting the ChatHeader component for use in the chat interface