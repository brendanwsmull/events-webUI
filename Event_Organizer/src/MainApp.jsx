import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import FeedScreen from './pages/FeedScreen';
import EventCreationScreen from './pages/EventCreationScreen';
import ProfileScreen from './pages/ProfileScreen';
import EventLandingScreen from './pages/eventLandingScreen';
import './MainApp.css';

export function MainApp() {
  return (
    <div className="container">
      <Header />
      <div className="navStuff">
        <Routes>
          <Route path="/" element={<Navigate to="feed" replace />} />
          <Route path="feed" element={<FeedScreen />} />
          <Route path="post" element={<EventCreationScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="event/:eventID" element={<EventLandingScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainApp;
