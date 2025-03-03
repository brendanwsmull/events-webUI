import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileComp.css';
import { ProfileContext } from '../contexts/profileContext';

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

  return (
    <div >
      <h3>Create Sub Account</h3>
      <p>Enter your username below</p>
      <input
        type="text"
        placeholder="Enter a Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <p>Enter your password below</p>
      <input
        type="password"
        placeholder="Enter a Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleCreateSubAccount} className="login-button">
        Create Account
      </button>
    </div>
  );
}

export default CreateSubAccountScreen;