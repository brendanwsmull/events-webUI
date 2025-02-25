import React, { useContext, useState } from 'react';
import './ProfileScreen.css'
import { ProfileContext } from '../contexts/profileContext';
import { CreateSubAccountScreen } from '../components/CreateSubComp'

export function ProfileScreen() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [preferences, setPreferences] = useState('');
  const [invite, setInvite] = useState('')
  
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
        <div>
          <p>You can invite accounts here:</p>
          <input
            type="text"
            value={preferences}
            onChange={(e) => setInvite(e.target.value)}
            placeholder="Enter User to invite to your group/organization"
          />
          <button>Invite User</button>
        </div>
      }
      {profile.accountType === 1 &&
        <div>
          <p>Edit your feed preferences here:</p>
          <input
            type="text"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="Enter your preferences..."
          />
          <button>Update Prefrences</button>
        </div>
      }
    </div>
  );
}

export default ProfileScreen;