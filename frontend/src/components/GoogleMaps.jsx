import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  GoogleMap,
  DirectionsRenderer,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

const GoogleMaps = () => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [drivingDistance, setDrivingDistance] = useState("");
  const [drivingTime, setDrivingTime] = useState("");
  const [coordinatesList, setCoordinatesList] = useState([]);

  useEffect(() => {
    fetchCurrentLocation();
  }, []);
  

  useEffect(() => {
    fetchDrivingData();
    addMarker(40, -80);
    addMarker(41, -81);
    addMarker(42, -82);
  }, [origin]);

  const fetchDrivingData = async () => {
    try {
      if (origin && destination) {
        const responseDistance = await axios.get(
          `http://localhost:4000/api/drivingDistance/${origin}`
        );
        setDrivingDistance(responseDistance.data.distance);

        const responseTime = await axios.get(
          `http://localhost:4000/api/drivingTime/${origin}`
        );
        setDrivingTime(responseTime.data.duration);
      }
    } catch (error) {
      console.error("Error fetching driving data:", error);
    }
  };

  const fetchCurrentLocation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/googlemaps/currentLocation"
      );
      const { latitude, longitude } = response.data;
      setDestination(`${latitude},${longitude}`);
    } catch (error) {
      console.error("Error fetching current location:", error);
    }
  };

  const containerStyle = {
    width: "100%",
    height: "50vh",
  };

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onDirectionsLoad = (directionsResponse) => {
    setDirections(directionsResponse);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "origin") {
      setOrigin(value);
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    renderDirections();
  };

const addMarker = (lat, lng) => {
  setCoordinatesList(prevState => [...prevState, { lat, lng }]);
};

  const renderMarkers = () => {
    return (
      <>
        {origin && <Marker position={origin} />}
        {destination && <Marker position={destination} />}
        {coordinatesList.map((coordinate, index) => (
          <Marker
            key={index}
            position={{ lat: coordinate.lat, lng: coordinate.lng }}
          />
        ))}
      </>
    );
  };

  const renderDirections = () => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();

      const directionsRequest = {
        origin: destination,
        destination: origin,
        travelMode: "DRIVING",
      };

      directionsService.route(directionsRequest, (response, status) => {
        if (status === "OK") {
          setDirections(response);
        } else {
          console.error("Directions request failed:", status);
        }
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDSuUPMgyRXTIgpUIWtBfWOyavLBdXsEJE">
      <div style={containerStyle}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={origin || destination}
          zoom={10}
          onLoad={onLoad}
        >
          {renderMarkers()}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
      <form onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="origin">Origin:</label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={origin}
            onChange={onInputChange}
          />
        </div>
        <button type="submit">Get Directions</button>
      </form>
      <div>
        <h1>Driving Distance: {drivingDistance}</h1>
        <h1>Driving Time: {drivingTime}</h1>
      </div>
    </LoadScript>
  );
};

export default GoogleMaps;
