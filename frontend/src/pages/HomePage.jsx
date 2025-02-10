import { useChatStore } from "../store/useChatStore"; // Importing the chat store for managing state

import Sidebar from "../components/Sidebar"; // Importing the sidebar component
import NoChatSelected from "../components/NoChatSelected"; // Component to display when no chat is selected
import ChatContainer from "../components/ChatContainer"; // Component to display the chat window

/*
HomePage.jsx =>
This  file is the main entry point for the chat application's home screen. 
Its primary purpose is to structure and display the chat interface, including the sidebar, 
chat container, and a placeholder when no chat is selected.
*/


const HomePage = () => {
  const { selectedUser } = useChatStore(); // Extracting selectedUser from the chat store

  return (
    <div className="h-screen bg-base-200"> {/* Full screen height with background color */}
      <div className="flex items-center justify-center pt-20 px-4"> {/* Centering the chat container */}
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]"> {/* Main chat container with max width and height */}
          <div className="flex h-full rounded-lg overflow-hidden"> {/* Layout for sidebar and chat */}
            <Sidebar /> {/* Sidebar component */}

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />} 
            {/* Show NoChatSelected if no user is selected, otherwise show the chat container */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; // Exporting the HomePage component