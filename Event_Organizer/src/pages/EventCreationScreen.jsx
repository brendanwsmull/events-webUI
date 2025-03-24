import React, { useState, useContext } from 'react';
import { ProfileContext } from '../contexts/profileContext';

export function EventCreationScreen() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [ eventName, setEventName ] = useState('');
  const [ desc, setDesc ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ cap, setCap ] = useState(0);
  const [ tags, setTags ] = useState('');
  const baseURL = 'http://localhost:5000/';

  const submitEvent = async () => {
    if (cap < 0) {
      alert("Capacity can't be negative...");
      return;
    }

    const data = {
      UUID: profile.uuid,
      eventName: eventName,
      address: address,
      desc: desc,
      cap: cap,
      tags: tags
    };
    console.log(data);
    const response = await fetch(baseURL+"createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      alert("Event Created");
    } else {
      alert("Something went wrong");
    }
  };
  
  return (
    <div>
      <h1>Create an Event Here:</h1>
      <p>What is the name of your event?</p>
      <input
        type='text'
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder='Address of your event'
      />
      <p>What is the address of your event?</p>
      <input
        type='text'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder='Name of your event'
      />
      <p>Please Describe your Event:</p>
      <textarea
        value={desc}
        onChange={(e) => {
          if (e.target.value.length <= 200) {
            setDesc(e.target.value);
          }
        }}
        placeholder="The Description of your event"
        maxLength={200}
      />
      <p>Enter the max amount of people that can attend your event (enter 0 if there is no limit):</p>
      <input 
        type="number"
        min="0"
        value={cap}
        onChange={(e) => setCap(e.target.value)}
        />
      <p>What are the tags that you want on your event:</p>
      <input
        type='text'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder='Tags of your event'
      />
      <p></p>
      <button onClick={submitEvent}>Create Event</button>
    </div>
  );
}

export default EventCreationScreen;