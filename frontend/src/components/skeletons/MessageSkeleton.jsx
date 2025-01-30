/**
 * MessageSkeleton.jsx Component=>
 * This component renders a skeleton placeholder for chat messages 
 * while the actual messages are loading.
 */
const MessageSkeleton = () => {
    // Create an array with 6 null values to represent skeleton messages
    const skeletonMessages = Array(6).fill(null);
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Loop through skeletonMessages array to render skeleton placeholders */}
        {skeletonMessages.map((_, idx) => (
          <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
            
            {/* Avatar Section */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                {/* Skeleton Placeholder for Avatar */}
                <div className="skeleton w-full h-full rounded-full" />
              </div>
            </div>
  
            {/* Message Header Placeholder */}
            <div className="chat-header mb-1">
              <div className="skeleton h-4 w-16" />
            </div>
  
            {/* Message Bubble Placeholder */}
            <div className="chat-bubble bg-transparent p-0">
              <div className="skeleton h-16 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageSkeleton; // Export component for use in chat interface  