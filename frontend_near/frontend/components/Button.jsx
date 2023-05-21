import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Button = () => {
  const navigate = useNavigate();
    const handleClick = () => {
        // Handle button click event
        console.log("pressed");
        navigate('/optional');
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
