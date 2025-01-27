/*
Navbar =>
This component is a responsive header that includes the application logo, a settings link, 
and authentication options (profile and logout) based on the user's authentication state. 
*/


// Importing Link from react-router-dom for navigation between pages.
import { Link } from "react-router-dom"; 
// Importing the useAuthStore hook for managing authentication state.
import { useAuthStore } from "../store/useAuthStore"; 
// Importing icons from lucide-react for various actions.
import { LogOut, MessageSquare, Settings, User } from "lucide-react"; 

const Navbar = () => {
  // Accessing the 'logout' function and 'authUser' from the authentication store.
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left side - Logo and Home Link */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              {/* Icon container */}
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              {/* Application name */}
              <h1 className="text-lg font-bold">LinkUp</h1>
            </Link>
          </div>

          {/* Right side - Navigation and Profile Options */}
          <div className="flex items-center gap-2">
            {/* Settings link */}
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" /> {/* Settings Icon */}
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* Conditional rendering if user is authenticated */}
            {authUser && (
              <>
                {/* Profile link */}
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="size-5" /> {/* User Icon */}
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {/* Logout button */}
                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" /> {/* Logout Icon */}
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;