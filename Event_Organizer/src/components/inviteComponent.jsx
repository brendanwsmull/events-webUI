import React, { useContext, useState } from 'react';
import { ProfileContext } from '../contexts/profileContext';
import { Button, ButtonGroup } from 'react-bootstrap';


export function InviteComponent({ groupName }) {
  const { profile, setProfile } = useContext(ProfileContext);
  const [ responded, setResponded ] = useState(false);
  const baseURL = 'http://localhost:5000/';

  const inviteResponse = async (accept) => {
    // send either the accept or reject response to the invite
    const data = {
      UUID: profile.uuid,
      group: groupName,
      accept: accept
    };
    const response = await fetch(baseURL + "inviteResponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.success) {
      console.log("responded to invite");
      setResponded(true);
    } else if (result.error === "private") {
      alert("You cannot join a private account");
    } else {
      alert("Something went wrong.");
    }
  };
  
  return (
    <div>
      {!responded ? (
        <div>
          <pre>
            <p>{groupName} has invited you to join their group:&nbsp;
              <ButtonGroup aria-label="Accept/Reject Invite">
                <Button variant="outline-primary" onClick={() => inviteResponse(true)}>Accept</Button>
                <Button variant="outline-danger" onClick={() => inviteResponse(false)}>Reject</Button>
              </ButtonGroup>
            </p>
          </pre>
        </div>
      ) : (
        <p>Responded to {groupName}'s invite!</p>
      )}
    </div>
  );
};

export default InviteComponent;