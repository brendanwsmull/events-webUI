import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileScreen.css'
import { ProfileContext } from '../contexts/profileContext';
import { CreateSubAccountScreen } from '../components/CreateSubComp'
import { RegularUserProfile } from '../components/regularUserProfile';
import { EventBlockComp } from '../components/eventBlockComp';
import { Button, Tab, Tabs } from 'react-bootstrap';

export function ProfileScreen() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [ invite, setInvite ] = useState('');
  const [ isPrivate, setIsPrivate ] = useState('');
  const [ attendingEvents, setAttendingEvents ] = useState([]);
  const [ hostingEvents, setHostingEvents ] = useState([]);
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000/"

  useEffect(() => {
    setIsPrivate(profile.isPrivate ? "Private" : "Public");
    const getData = async () => {
      await getEvents();
    };
    getData();
  }, [])

  const handleLogout = () => {
    navigate('/');
  }

  const handlePrivate = async () => {
    profile.isPrivate = !profile.isPrivate

    const data = {
        UUID: profile.uuid,
        isPrivate: profile.isPrivate
    };

    const response = await fetch("http://localhost:5000/setPrivate", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.status === 200) {
        alert("Change successful!");
    } else {
        alert("Something went wrong");
    }
    setIsPrivate(profile.isPrivate ? "Private" : "Public");
  };

  const inviteUser = async () => {
    const data = {
      UUID: profile.uuid,
      invitedUser: invite
    };
    const response = await fetch("http://localhost:5000/inviteAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      alert("invite sent!");
    }
    else if (response.status == 400) {
      alert("user does not exist");
    }
    else {
      alert("500 error, something went wrong");
    }
  };

  const getEvents = async () => {
    const response = await fetch(baseURL+`getUserEvents?UUID=${profile.uuid}`);
    if (response.status != 200) {
      alert("Something went wrong when getting your events");
      return;
    }
    const data = await response.json();
    setAttendingEvents(data.attendingEvents);
    setHostingEvents(data.hostingEvents);
  };

  return (
    <div>
      <Button className="float-end" variant="warning" onClick={handleLogout}>
        Log Out
      </Button>
      <h2>{profile.username}'s Profile</h2>
      <Tabs defaultActiveKey="events" id="Profile Menu" className="mb-3">
        <Tab eventKey="events" title="Events">
          {profile.accountType === 1 && (
            <div>
              <p>Events you're currently signed up for:</p>
              {attendingEvents.length === 0 ? (
                <p>No events found</p>
              ) : (
                <div className="event-container">
                  {attendingEvents.map((event, index) => (
                    <EventBlockComp key={index} event={event} type={1}/>
                  ))}
                </div>
              )}
            </div>
          )}
          <p>Your Events:</p>
          {hostingEvents.length === 0 ? (
            <p>No events found</p>
          ) : (
            <div className="event-container">
              {hostingEvents.map((event, index) => (
                <EventBlockComp key={index} event={event} type={2}/>
              ))}
            </div>
          )}
        </Tab>        
        <Tab eventKey="settings" title="Settings">
          {profile.accountType === 1 &&
            <div>
              <RegularUserProfile />
            </div>
          }
          {profile.accountType >= 2 &&
            <div>
              <p>You can invite accounts here:</p>
              <input
                type="text"
                onChange={(e) => setInvite(e.target.value)}
                placeholder="Enter User to invite to your group/organization"
              />
              <Button variant="outline-primary" style={{ marginLeft: '10px' }} onClick={inviteUser}>Invite User</Button>
              <p></p>
              <p>This account is {isPrivate} {isPrivate === "Private" ? (
                <Button variant="outline-danger" style={{ marginLeft: '10px' }} onClick={handlePrivate}>toggle</Button>
              ) : (
                <Button variant="outline-primary" onClick={handlePrivate}>toggle</Button>
              )}</p>
            </div>
          }
          {profile.accountType === 3 && (
            <div>
              <p>You can create sub accounts here:</p>
              <CreateSubAccountScreen />
            </div>
          )}
        </Tab>
      </Tabs>
      
    </div>
  );
}

export default ProfileScreen;