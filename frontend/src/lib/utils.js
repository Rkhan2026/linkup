/**
 * Formats a given date into a 24-hour time string.
 * 
 * @param {string | number | Date} date - The date to format. Can be a Date object, timestamp, or date string.
 * @returns {string} - The formatted time in "HH:MM" 24-hour format.
 */
export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",   // Ensures two-digit hour format (e.g., 09, 14)
      minute: "2-digit", // Ensures two-digit minute format (e.g., 05, 30)
      hour12: false,     // Uses 24-hour format instead of AM/PM
    });
}
//This utility is imported in ChatContainer.jsx