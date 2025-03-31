import React, { useContext, useState } from 'react';
import { ProfileContext } from '../contexts/profileContext';
import "./eventBlockComp.css"

export function EventBlockComp({ event, type }) {
  const baseURL = "localhost:5000/"
  const { profile, setProfile } = useContext(ProfileContext);
  
  const unSignUp = async () => {
    const response = await fetch(baseURL+ `unSignUpEvent?UUID=${profile.uuid}&UEID=${event.UEID}`);

  }

  const deleteEvent = async () => {

  }
  
  return (
    <div className="event-block">
      <h3>{event.eventName}</h3>
      {event.hostName && (
        <p><b>Event Host: </b>{event.hostName}</p>
      )}
      <p>{event.eventDesc}</p>
      <p><b>Date:</b> {event.date}</p>
      <p><b>Location:</b> {event.locationName}</p>
      <p><b>Capacity:</b> {event.cap}</p>
      <p><b>Tags:</b> {event.tags}</p>
      <button onClick={unSignUp}>Remove</button>
    </div>
  )
}

export default EventBlockComp;