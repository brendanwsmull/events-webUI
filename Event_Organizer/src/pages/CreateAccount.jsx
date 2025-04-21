import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

export function CreateAccountScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  const baseURL =  import.meta.env.VITE_BASE_URL;

  const handleCreateAccount = async () => {
    console.log("create button clicked")
    if (username == '' || password == '' || userType == "") {
      alert("Please fill out the information");
      return;
    }
    const data = {
      username: username,
      password: password,
      accountType: userType
    }
    const response = await fetch(`${baseURL}/createAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status == 201) {
        alert("Account Created!");
        navigate("/");
    }
    else if (response.status == 400) {
        alert("Name already taken");
        return;
    }
    else {
        alert("Something else went wrong");
        return
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Create Account</h1>
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
      <p>Select a User Type</p>
      <select 
      id="userType" 
      value={userType} 
      onChange={(e) => setUserType(e.target.value)}
      className="login-button">
        <option value="">-- Select --</option>
        <option value={1}>Normal User</option>
        <option value={3}>Organization User</option>
      </select>
      <button onClick={handleCreateAccount} className="login-button">
        Create Account
      </button>
    </div>
  );
}

export default CreateAccountScreen;