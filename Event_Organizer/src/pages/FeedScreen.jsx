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
    const response = await fetch(baseURL+`getEventFeed?UUID=${profile.uuid}&long=${userLocation.longitude}&lat=${userLocation.latitude}`);
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
      {events.length === 0 && gEvents.length == 0 ? (
        <p>No events found</p>
      ) : (
        <div>
          <div className="event-container">
            {gEvents.map((gEvent, index) => (
              <EventBlockComp key={`${index}`} event={gEvent} type={3}/>
            ))}
          </div>
          <div className="event-container">
            {events.map((event, index) => (
              <EventBlockComp key={`${index}`} event={event} type={3}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedScreen;