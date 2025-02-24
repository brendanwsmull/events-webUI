import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './Login';
import MainApp from './MainApp';
import { ProfileProvider } from './contexts/profileContext';

export function App() {
  return (
    <ProfileProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/app/*" element={<MainApp />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;
