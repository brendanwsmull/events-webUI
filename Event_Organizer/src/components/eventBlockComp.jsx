import React, { useContext, useState } from 'react';
import { ProfileContext } from '../contexts/profileContext';
import "./eventBlockComp.css"
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


export function EventBlockComp({ event, type }) {
  const baseURL =  import.meta.env.VITE_BASE_URL;
  const { profile, setProfile } = useContext(ProfileContext);
  const [ visible, setVisible ] = useState(true);
  const navigate = useNavigate();
  
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
    else if (response.status === 403) {
      alert("Already signed up for this event\n(See \"Profile\" page)")
    }
    else {
      alert("Something went wrong when trying to sign up for your event!");
      return
    }
  }

  const titleClick = () => {
    navigate(`/app/event/${event.UEID}`);
  }
  // set styling to use bootstrap cards found here: https://react-bootstrap.netlify.app/docs/components/cards
  return (
    <div className="event-block">
      {visible ? (
        <Card style={{ width: '23rem'}}>
          <Card.Body>
            <Card.Title className="click-title" onClick={titleClick}>{event.eventName}</Card.Title>
            {event.hostName && (
              <div>
                <br />
                <Card.Subtitle className="mb-2 text-muted"><b>Event Host: </b>{event.hostName}</Card.Subtitle>
              </div>
            )}
            <Card.Text><ReactMarkdown>{event.eventDesc}</ReactMarkdown></Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup.Item><b>Date:</b> {event.date}</ListGroup.Item>
              <ListGroup.Item><b>Address:</b> {event.locationName}</ListGroup.Item>
              <ListGroup.Item><b>Capacity:</b> {event.cap}</ListGroup.Item>
              <ListGroup.Item><b>Tags:</b> {event.tags}</ListGroup.Item>
            </ListGroup>
            <br />
            {type === 1 && <Button variant="outline-primary" onClick={unSignUp}>Remove</Button>}
            {type === 2 && <Button variant="outline-primary" onClick={deleteEvent}>Delete Event</Button>}
            {type === 3 && <Button variant="outline-primary" onClick={signUp}>Sign Up</Button>}
          </Card.Body>
        </Card>
      ) : (
        <div>
          <p>event removed</p>
        </div>
      )}
    </div>
  )
}

export default EventBlockComp;