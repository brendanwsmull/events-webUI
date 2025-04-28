import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { ProfileContext } from '../contexts/profileContext';
import { Button, ListGroup } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const EventLandingScreen = () => {
  const { eventID } = useParams();
  const [event, setEvent] = useState();
  const { profile, setProfile } = useContext(ProfileContext);
  const navigate = useNavigate();
  const baseURL =  import.meta.env.VITE_BASE_URL;

  const fetchEvent = async () => {
    const response = await fetch(`${baseURL}/getSingleEvent?UEID=${eventID}`);
    const data = await response.json();

    if (data.status === "event found") {
      setEvent(data.event);
    }
    else {
      console.error("Event not found:", data);
    }
  };

  const handleSignUp = async () => {
    if (profile === -1) {
      alert("You must be logged in to sign up");
      navigate('/');
      return;
    }
    
    const response = await fetch(baseURL+ `signUp?UUID=${profile.uuid}&UEID=${event.UEID}&cap=${event.cap}`);
    if (response.status === 200) {
      console.log("event deletion success");
      alert("Signed up for the event!");
      return;
    }
    else if (response.status === 403) {
      alert("Already signed up for this event\n(See \"Profile\" page)")
    }
    else {
      alert("Something went wrong when trying to sign up for your event!");
      return
    }
  }

  useEffect(() => {
    if (eventID) fetchEvent();
  }, [eventID])

  // uses boostrap listgroup to display everything: https://react-bootstrap.netlify.app/docs/components/list-group/
  return (
    <div>
      {!event ? (
        <div className="justify-content-center">
          <h3 className="text-muted">Page not found</h3>
        </div>
      ) : (
        <div className="justify-content-center">
          <h1 className="mb-3 text-center">{event.eventName}</h1>
          <ListGroup className="mb-4">
            <ListGroup.Item><strong>Desc:</strong> <ReactMarkdown>{event.eventDesc}</ReactMarkdown></ListGroup.Item>
            <ListGroup.Item><strong>Date:</strong> {event.date}</ListGroup.Item>
            <ListGroup.Item><strong>Location:</strong> {event.locationName}</ListGroup.Item>
            <ListGroup.Item><strong>Capacity:</strong> {event.cap} people</ListGroup.Item>
            <ListGroup.Item><strong>Tags:</strong> {event.tags}</ListGroup.Item>
          </ListGroup>
          <div className="d-grid">
            <Button variant="warning" size="lg" onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventLandingScreen;