import React from 'react'

export const Button = () => {
    const handleClick = () => {
        // Handle button click event
        console.log("pressed");
      };
    
      return (
        <div>
          {/* Other content */}
          <button
            style={{
              backgroundColor: 'red',
              color: '#fff',
              padding: '10px 20px',
              fontSize: '20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            Click Me
          </button>
        </div>
      );
}
