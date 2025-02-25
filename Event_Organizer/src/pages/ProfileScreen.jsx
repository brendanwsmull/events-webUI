import React from 'react';
import './ProfileScreen.css'
import { ProfileContext } from '../contexts/profileContext';

export function ProfileScreen() {
  const { profile, setProfile } = useContext(ProfileContext);
  
  return (
    <div>
      <h2>Your Profile</h2>
    </div>
  );
}

export default ProfileScreen;