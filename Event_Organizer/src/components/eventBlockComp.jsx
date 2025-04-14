import React, { useContext, useState } from 'react';
import { ProfileContext } from '../contexts/profileContext';
import "./eventBlockComp.css"
import { Button } from 'react-bootstrap';


export function EventBlockComp({ event, type }) {
  const baseURL = "http://localhost:5000/"
  const { profile, setProfile } = useContext(ProfileContext);
  const [ visible, setVisible ] = useState(true);
  
  const unSignUp = async () => {
    const response = await fetch(baseURL+ `unSignUpEvent?UUID=${profile.uuid}&UEID=${event.UEID}`);
    if (response.status === 200) {
      console.log("unSignUp success");
      setVisible(false);
      return;
    }
    else {
      alert("Something went wrong when trying to unsign you up!");
      return
    }
  }

  const deleteEvent = async () => {
    const response = await fetch(baseURL+ `deleteEvent?UEID=${event.UEID}`);
    if (response.status === 200) {
      console.log("event deletion success");
      setVisible(false);
      return;
    }
    else {
      alert("Something went wrong when trying to delete your event!");
      return
    }
  }

  const signUp = async () => {
    const response = await fetch(baseURL+ `signUp?UUID=${profile.uuid}&UEID=${event.UEID}&cap=${event.cap}`);
    if (response.status === 200) {
      console.log("event deletion success");
      alert("Signed up for the event!");
      return;
    }
    else {
      alert("Something went wrong when trying to sign up for your event!");
      return
    }
  }
  
  return (
    <div className="event-block">
      {visible ? (
        <div>
          <h3>{event.eventName}</h3>
          {event.hostName && (
            <p><b>Event Host: </b>{event.hostName}</p>
          )}
          <p>{event.eventDesc}</p>
          <p><b>Date:</b> {event.date}</p>
          <p><b>Location:</b> {event.locationName}</p>
          <p><b>Capacity:</b> {event.cap}</p>
          <p><b>Tags:</b> {event.tags}</p>
          {type === 1 && <Button variant="outline-primary" onClick={unSignUp}>Remove</Button>}
          {type === 2 && <Button variant="outline-primary" onClick={deleteEvent}>Delete Event</Button>}
          {type === 3 && <Button variant="outline-primary" onClick={signUp}>Sign Up</Button>}
        </div>
      ) : (
        <div>
          <p>event removed</p>
        </div>
      )}
    </div>
  )
}

export default EventBlockComp;