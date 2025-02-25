import React, { useContext } from 'react';
import './ProfileScreen.css'
import { ProfileContext } from '../contexts/profileContext';
import { CreateSubAccountScreen } from '../components/CreateSubComp'

export function ProfileScreen() {
  const { profile, setProfile } = useContext(ProfileContext);
  
  return (
    <div>
      <h2>{profile.username}'s Profile</h2>
      {profile.accountType === 3 && (
        <div>
          <p>You can create sub accounts here:</p>
          <CreateSubAccountScreen />
        </div>
      )}
      {profile.accountType >= 2 &&
        <p>You can invite accounts here:</p>
      }
      {profile.accountType === 1 &&
        <p>Edit your feed preferences here:</p>
      }
    </div>
  );
}

export default ProfileScreen;