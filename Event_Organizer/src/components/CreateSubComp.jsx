import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileComp.css';
import { ProfileContext } from '../contexts/profileContext';
import { Button, Form, InputGroup } from 'react-bootstrap';


export function CreateSubAccountScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { profile, setProfile } = useContext(ProfileContext);

  const handleCreateSubAccount = async () => {
    console.log("create sub button clicked")
    if (username == '' || password == '') {
      alert("Please fill out the information");
      return;
    }
    const data = {
      hostuser: profile.uuid,
      username: username,
      password: password
    }
    const response = await fetch("http://localhost:5000/createSubAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status == 201) {
        alert("Account Created!");
    }
    else if (response.status == 400) {
        alert("Name already taken");
        return;
    }
    else {
        alert("Something else went wrong while attempting to create sub-account");
        return;
    }
  }
  // using InputGroups from here: https://react-bootstrap.netlify.app/docs/forms/input-group
  return (
    <div >
      <h3>Create Sub Account</h3>
      <InputGroup className="mb-3">
        <InputGroup.Text>Sub Credentials:</InputGroup.Text>
        <Form.Control 
          aria-label="username"
          placeholder="Enter a Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Form.Control 
          aria-label="password"
          placeholder="Enter a Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
      </InputGroup>
      <Button variant="outline-primary" onClick={handleCreateSubAccount} className="login-button">
        Create Account
      </Button>
    </div>
  );
}

export default CreateSubAccountScreen;