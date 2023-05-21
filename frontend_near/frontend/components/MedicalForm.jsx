import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export const MedicalForm = ({toRender}) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState([]);
  const [medications, setMedications] = useState([]);
  const [toHash, setToHash] = useState('');

  const [accounts, setAccounts] = useState(null);
    if (!toRender){
      console.log("rendering");
      toRender = !toRender;
      navigate('/button');
    }
    else {
      navigate('/medical-history');
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as sending data to a server or performing necessary actions.
    // You can access the entered values in the state variables (name, age, bloodType, allergies, medications).
    
    const appendedAllergies = allergies.join(', ');
    const appendedMedications = medications.join(', ');
    const concatenatedString = name + age + bloodType + appendedAllergies + appendedMedications;
    console.log(concatenatedString);
    setToHash(concatenatedString);
    fetch('http://localhost:4000/api/medical', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        hash: concatenatedString,
        name: name,
        age: age,
        blood: bloodType,
        allergies: allergies,
        medication: medications,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        // localStorage.setItem('hash', concatenatedString);
        console.log('User information successfully sent to the server:', data);
        navigate('/button');
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.error('Error sending user information:', error);
      });
  };

  const handleAllergyChange = (e, index) => {
    const updatedAllergies = [...allergies];
    updatedAllergies[index] = e.target.value;
    setAllergies(updatedAllergies);
  };

  const handleMedicationChange = (e, index) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = e.target.value;
    setMedications(updatedMedications);
  };

  const addAllergy = () => {
    setAllergies([...allergies, '']);
  };

  const removeAllergy = (index) => {
    const updatedAllergies = [...allergies];
    updatedAllergies.splice(index, 1);
    setAllergies(updatedAllergies);
  };

  const addMedication = () => {
    setMedications([...medications, '']);
  };

  const removeMedication = (index) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  return (
    <div>
      <h3>WE JUST NEED A LITTLE MORE INFORMATION</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br />
        <label>
          Blood Type:
          <select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </label>
        <br />
        <label>
          Allergies:
          {allergies.map((allergy, index) => (
            <div key={index}>
              <input
                type="text"
                value={allergy}
                onChange={(e) => handleAllergyChange(e, index)}
              />
              <button type="button" onClick={() => removeAllergy(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addAllergy}>
            Add Allergy
          </button>
        </label>
        <br />
        <label>
          Medications:
          {medications.map((medication, index) => (
            <div key={index}>
              <input
                type="text"
                value={medication}
                onChange={(e) => handleMedicationChange(e, index)}
              />
              <button type="button" onClick={() => removeMedication(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addMedication}>
            Add Medication
          </button>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
