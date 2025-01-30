/**
 * SidebarSkeleton.jsx Component=>
 * This component displays a loading placeholder for the sidebar contacts 
 * while the user data is being fetched.
 */

import { Users } from "lucide-react"; // Importing the Users icon from lucide-react

const SidebarSkeleton = () => {
  // Create an array of 8 null values to generate 8 skeleton placeholders
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      {/* Sidebar Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" /> {/* Users Icon */}
          <span className="font-medium hidden lg:block">Contacts</span> {/* Sidebar title (hidden on small screens) */}
        </div>
      </div>

      {/* Skeleton Contacts Placeholder */}
      <div className="overflow-y-auto w-full py-3">
        {/* Loop through skeletonContacts array to render skeleton placeholders */}
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" /> {/* Placeholder for profile picture */}
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" /> {/* Placeholder for user name */}
              <div className="skeleton h-3 w-16" /> {/* Placeholder for user status (Online/Offline) */}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton; // Exporting the component for use in the sidebar