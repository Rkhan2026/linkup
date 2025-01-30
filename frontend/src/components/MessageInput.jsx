/**
 * MessageInput.jsx Component=>
 * Handles sending text and image messages in a chat interface.
 * Provides input fields for text and image attachments, along with validation.
 */

import { useRef, useState } from "react"; // Import hooks for managing state and references
import { useChatStore } from "../store/useChatStore"; // Import chat store to manage sending messages
import { Image, Send, X } from "lucide-react"; // Import icons from lucide-react
import toast from "react-hot-toast"; // Import toast notifications for user feedback

const MessageInput = () => {
  // State for message text input
  const [text, setText] = useState("");

  // State to store the selected image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Ref for file input element (used for selecting images)
  const fileInputRef = useRef(null);

  // Function to send messages (from chat store)
  const { sendMessage } = useChatStore();

  /**
   * Handles file selection and previews the selected image
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file

    // Validate that the file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file"); // Show error if not an image
      return;
    }

    // Read the image file and set preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Store base64 preview of the image
    };
    reader.readAsDataURL(file);
  };

  /**
   * Removes the selected image preview
   */
  const removeImage = () => {
    setImagePreview(null); // Clear image preview
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
  };

  /**
   * Handles sending a message (text and/or image)
   */
  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Prevent sending an empty message (no text or image)
    if (!text.trim() && !imagePreview) return;

    try {
      // Send message via chat store function
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear input fields after successful send
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error); // Log error if message fails to send
    }
  };

  return (
    <div className="p-4 w-full">
      {/* Image Preview Section */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview} // Display selected image preview
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            {/* Remove Image Button */}
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          {/* Text Input Field */}
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)} // Update text state
          />

          {/* Hidden File Input for Image Upload */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange} // Handle image selection
          />

          {/* Image Upload Button */}
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()} // Trigger file input click
          >
            <Image size={20} />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview} // Disable if no input
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput; // Export component for use in chat interface