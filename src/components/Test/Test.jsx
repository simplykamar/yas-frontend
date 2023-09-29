import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LocationComponent() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Make a request to the Geocoding API
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
          );

          if (response.data.results.length > 0) {
            const address = response.data.results[0].formatted_address;
            setLocation(address);
          } else {
            setLocation('Location not found');
          }
        } catch (error) {
          console.error('Error fetching location data:', error);
        }
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not available in your browser.');
    }
  }, []);

  return (
    <div>
      {location ? <p>Location: {location}</p> : <p>Getting location...</p>}
    </div>
  );
}

export default LocationComponent;