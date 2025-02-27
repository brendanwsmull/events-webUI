import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileScreen.css'
import { ProfileContext } from '../contexts/profileContext';
import { CreateSubAccountScreen } from '../components/CreateSubComp'

export function ProfileScreen() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [ preferences, setPreferences ] = useState('');
  const [ invite, setInvite ] = useState('');
  const [ isPrivate, setIsPrivate ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsPrivate(profile.isPrivate ? "Private" : "Public");
  }, [])

  const handleLogout = () => {
    navigate('/');
  }

  const handlePrivate = async () => {
    profile.isPrivate = !profile.isPrivate

    const data = {
        UUID: profile.uuid,
        isPrivate: profile.isPrivate
    };

    const response = await fetch("http://localhost:5000/setPrivate", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.status === 200) {
        alert("Change successful!");
    } else {
        alert("Something went wrong");
    }
    setIsPrivate(profile.isPrivate ? "Private" : "Public");
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
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
          <p>This account is {isPrivate} <button onClick={handlePrivate}>toggle</button></p>
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