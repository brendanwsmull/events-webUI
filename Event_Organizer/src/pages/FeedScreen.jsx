import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../contexts/profileContext';
import { LocationContext } from '../contexts/locationContext';
import { EventBlockComp } from '../components/eventBlockComp';
import './ProfileScreen.css';

export function FeedScreen() {
  const { profile, setProfile } = useContext(ProfileContext);
  const { userLocation, setUserLocation } = useContext(LocationContext);
  const [ events, setEvents ] = useState([]);
  const [ gEvents, setGEvents ] = useState([]);
  const baseURL = "http://localhost:5000/"

  const getFeed = async () => {
    // for some reason the lat and long are swapped, no clue why but this works
    const response = await fetch(baseURL+`getEventFeed?UUID=${profile.uuid}&long=${userLocation.latitude}&lat=${userLocation.longitude}`);
    if (response.status != 200) {
      alert("Something went wrong when getting your events");
      return;
    }
    const data = await response.json();
    setEvents(data.eventFeed);
    setGEvents(data.groupEvents);
  }

  useEffect(() => {
    getFeed();
  }, []);
  
  return (
    <div>
      <h1>Your Events Feed</h1>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <div>
          {gEvents.length !== 0 && (
            <div>
              <h3>Events hosted by your group:</h3>
              <div className="event-container">
                {gEvents.map((gEvent, index) => (
                  <EventBlockComp key={`${index}`} event={gEvent} type={3}/>
                ))}
              </div>
            </div>
          )}
          {events.length !== 0 && (
            <div>
              <br />
              <br />
              <h3>Public Events that match your prefrences:</h3>
              <div className="event-container">
                {events.map((event, index) => (
                  <EventBlockComp key={`${index}`} event={event} type={3}/>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FeedScreen;