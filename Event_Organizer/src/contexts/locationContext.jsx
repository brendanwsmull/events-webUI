import React, { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  // the code below is retrieved from: https://dev.to/choiruladamm/how-to-use-geolocation-api-using-reactjs-ndk
  // define the function that finds the users geolocation
  const getUserLocation = () => {
    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // update the value of userlocation variable
          setUserLocation({ latitude, longitude });
        },
        // if there was an error getting the users location
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
    // if geolocation is not supported by the users browser
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  // this calls the get location function once on load
  useEffect(() => {
    getUserLocation();
  }, [])

    return (
        <LocationContext.Provider value={{ userLocation, setUserLocation }}>
            {children}
        </LocationContext.Provider>
    );
};
