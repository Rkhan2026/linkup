/*
NoChatSelected.jsx =>
Displays a Message When No Chat is Selected:
Includes a Bouncing Chat Icon:
This component is conditionally rendered in HomePage.jsx when selectedUser is null or undefined.
*/

import { MessageSquare } from "lucide-react"; // Importing an icon from the lucide-react library

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      {/* Container to center the content */}
      <div className="max-w-md text-center space-y-6">
        
        {/* Icon Display Section */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              {/* Chat icon inside a bouncing animated div */}
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <h2 className="text-2xl font-bold">Welcome to LinkUp!</h2>
        
        {/* Instructional Text */}
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected; // Exporting the component for use in other files