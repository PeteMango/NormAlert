import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, DirectionsRenderer, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMaps = () => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const fetchCurrentLocation = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/googlemaps/currentLocation');
      const { latitude, longitude } = response.data;
      setDestination(`${latitude},${longitude}`); // Set current location as the destination
    } catch (error) {
      console.error('Error fetching current location:', error);
    }
  };

  const containerStyle = {
    width: '100%',
    height: '50vh',
  };

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onDirectionsLoad = (directionsResponse) => {
    setDirections(directionsResponse);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'origin') {
      setOrigin(value);
    } else if (name === 'destination') {
      setDestination(value);
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    renderDirections();
  };

  const renderMarkers = () => {
    return (
      <>
        {origin && <Marker position={origin} />}
        {destination && <Marker position={destination} />}
      </>
    );
  };

  const renderDirections = () => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();

      const directionsRequest = {
        origin,
        destination,
        travelMode: 'DRIVING',
      };

      directionsService.route(directionsRequest, (response, status) => {
        if (status === 'OK') {
          setDirections(response);
        } else {
          console.error('Directions request failed:', status);
        }
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDSuUPMgyRXTIgpUIWtBfWOyavLBdXsEJE">
      <div style={containerStyle}>
        <GoogleMap mapContainerStyle={containerStyle} center={origin || destination} zoom={10} onLoad={onLoad}>
          {renderMarkers()}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
      <form onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="origin">Origin:</label>
          <input type="text" id="origin" name="origin" value={origin} onChange={onInputChange} />
        </div>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input type="text" id="destination" name="destination" value={destination} onChange={onInputChange} />
        </div>
        <button type="submit">Get Directions</button>
      </form>
    </LoadScript>
  );
};

export default GoogleMaps;
