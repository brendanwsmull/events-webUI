import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './Login';
import MainApp from './MainApp';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/app/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
