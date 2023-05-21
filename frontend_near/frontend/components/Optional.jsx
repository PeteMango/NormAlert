import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const Optional = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleButtonClick = () => {
    if (description === '') {
      // Handle skip button click event
      console.log("skipped");
    } else {
      // Handle submit button click event
      console.log("submit");
    }
    console.log(description);
    navigate('/final');
  };

  return (
    <form>
      <label>
        Description:
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter your description"
        />
      </label>
      <br />
      <button
        type="button"
        onClick={handleButtonClick}
        style={{
          backgroundColor: '#4caf50',
          color: '#fff',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {description.length === 0 ? 'Skip' : 'Submit'}
      </button>
    </form>
  );
}
