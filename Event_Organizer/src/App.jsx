import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './Login';
import MainApp from './MainApp';
import CreateAccountScreen from './pages/CreateAccount';
import { ProfileProvider } from './contexts/profileContext';
import { LocationProvider } from './contexts/locationContext';

export function App() {
  return (
    <LocationProvider>
      <ProfileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/app/*" element={<MainApp />} />
            <Route path="/createAccount" element={<CreateAccountScreen />} />
          </Routes>
        </Router>
      </ProfileProvider>
    </LocationProvider>
  );
}

export default App;
