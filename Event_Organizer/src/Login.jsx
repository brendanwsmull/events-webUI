import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ProfileContext } from './contexts/profileContext'; // to get context must import this

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { profile, setProfile } = useContext(ProfileContext); // use this for access and setting profile json

  const handleLogin = () => {
    console.log('Username:', username, 'Password:', password);
    console.log('context test:', profile)
    navigate('/app');
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
