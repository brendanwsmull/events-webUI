import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ProfileContext } from './contexts/profileContext'; // to get context must import this

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { profile, setProfile } = useContext(ProfileContext); // use this for access and setting profile json

  const handleLogin = async () => {
    console.log('Username:', username, 'Password:', password);
    if (username == '' || password == '') {
      alert("you forgot to enter in user details");
      return
    }
    const response = await fetch(`http://localhost:5000/login?username=${username}&password=${password}`);
    const data = await response.json();
    if (data.success) {
      setProfile(data);
      navigate('/app');
    }
    else alert("invalid login");
    console.log(data)
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
}
