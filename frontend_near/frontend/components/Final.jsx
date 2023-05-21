import React from 'react'

export const Final = () => {
    const people = [
        { name: 'John Doe', eta: '10 minutes', distance: '2 miles' },
        { name: 'Jane Smith', eta: '15 minutes', distance: '3 miles' },
        { name: 'Alice Johnson', eta: '8 minutes', distance: '1 mile' },
      ];
    
      return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: '1', backgroundColor: '#f0f0f0', minHeight: '60vh' }}>
        {/* Temporary div for the map */}
      </div>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', minHeight: '40vh' }}>
        {/* Temporary div for displaying people's information */}
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>ETA</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.eta}</td>
                <td>{person.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      );
};
