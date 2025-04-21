import React, { useState, useContext } from 'react';
import { ProfileContext } from '../contexts/profileContext';
import { Button, Form, InputGroup  } from 'react-bootstrap';

export function EventCreationScreen() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [ eventName, setEventName ] = useState('');
  const [ desc, setDesc ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ cap, setCap ] = useState(0);
  const [ tags, setTags ] = useState('');
  const [eventDateTime, setEventDateTime] = useState('');
  const baseURL = process.env.REACT_APP_BASE_URL;

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
      tags: tags,
      date: eventDateTime
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
  
  // uses form group from here: https://react-bootstrap.netlify.app/docs/forms/form-control
  return (
    <div>
      <h1 className="mb-4">Create an Event Here:</h1>
      <Form>
        <Form.Group className="mb-3 col-md-6">
          <Form.Label>What is the name of your event?</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Name of your event"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3 col-md-6">
          <Form.Label>What is the address of your event?</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Address of your event"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3 col-md-6">
          <Form.Label>When is your event happening?</Form.Label>
          <Form.Control
            type="datetime-local"
            value={eventDateTime}
            onChange={(e) => setEventDateTime(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-6">
          <Form.Label>Please describe your event:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            maxLength={200}
            placeholder="The Description of your event"
            value={desc}
            onChange={(e) => {
              if (e.target.value.length <= 200) {
                setDesc(e.target.value);
              }
            }}
          />
          <Form.Text muted>{200 - desc.length} characters left</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3 col-md-6">
          <Form.Label>Enter the max amount of people that can attend your event (enter 0 if there is no limit):</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={cap}
            onChange={(e) => setCap(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-6">
          <Form.Label>What are the tags that you want on your event:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tags of your event"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </Form.Group>
        <Button variant="warning" onClick={submitEvent}>Create Event</Button>
      </Form>
    </div>
  );
}

export default EventCreationScreen;