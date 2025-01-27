/*
This component displays a pattern of 9 squares with alternating animations, a heading (title), 
and a short description (subtitle). The visual pattern is only visible on larger screens, 
helping create a visually appealing section in a responsive layout.
*/

const AuthImagePattern = ({ title, subtitle }) => {
    return (
      // This div will be visible on large screens (hidden on smaller screens).
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        {/* Container for the content, with maximum width set to 'max-w-md' and centered text */}
        <div className="max-w-md text-center">
          
          {/* Grid for 9 square divs with a gap of 3 */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {/* Create an array of length 9 to generate 9 grid items */}
            {[...Array(9)].map((_, i) => (
              <div
                key={i} // Unique key for each grid item
                className={`aspect-square rounded-2xl bg-primary/10 // Aspect ratio of 1:1 (square), rounded corners, background color with transparency
                  ${i % 2 === 0 ? "animate-pulse" : ""} // Apply pulsing animation for even indexed elements
                `}
              />
            ))}
          </div>
  
          {/* Heading for the section, displaying the 'title' prop */}
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
  
          {/* Paragraph for the subtitle, displaying the 'subtitle' prop */}
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
export default AuthImagePattern;  