import React, {useState} from 'react'

export const MedicalForm = () => {
    const [age, setAge] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState([]);
  const [medications, setMedications] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as sending data to a server or performing necessary actions.
    // You can access the entered values in the state variables (age, bloodType, allergies, medications).
    console.log(age);
    console.log(bloodType);
    console.log(allergies);
    console.log(medications);
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
    <form onSubmit={handleSubmit}>
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
  );

}
