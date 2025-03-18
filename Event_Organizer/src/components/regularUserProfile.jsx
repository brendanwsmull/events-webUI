import React, { useContext, useState, useEffect } from 'react';
import { ProfileContext } from '../contexts/profileContext';
import { InviteComponent } from './inviteComponent'

export function RegularUserProfile() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [ preferences, setPreferences ] = useState('');
  const [ currentPreferences, setCurrentPreferences ] = useState('');
  const [ joinAccount, setJoinAccount ] = useState('');
  const [ currentGroups, setCurrentGroups ] = useState('None');
  const [ distance, setDistance ] = useState('0');
  const [ invitedToGroups, setInvitedToGroups ] = useState(['test1', 'test2', 'test3']); // to hold the json of groups the user is invited to
  const baseURL = 'http://localhost:5000/';

  const updatePreferences = async () => {
    // TODO: send api request to insert new string of prefrences
    // TODO: update preferences state to reflect what was inside the box

    const data = {
      UUID: profile.uuid, 
      pref: preferences
    };

    const response = await fetch(baseURL+"updatePreferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      alert("Change successful!");
  } else {
      alert("Something went wrong");
  }
  };

  const getPrefs = async () => {
    const response = await fetch(baseURL+`getPrefs?UUID=${profile.uuid}`);
    const data = await response.json();
    if (data.success) {
      setPreferences(data.prefs);
    }
    else alert("something went wrong");
  };

  const sendJoinRequest = async () => {
    // TODO: send api request to join account
    const data = {
      UUID: profile.uuid, 
      joining: joinAccount
    };

    const response = await fetch(baseURL+"sendJoinRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      alert("Request Sent");
  } else {
      alert("Something went wrong");
  }
  };

  const getCurrentGroups = async () => {
    // TODO: get list of current groups and display them in a string inside of currentGroups
    const response = await fetch(baseURL+`getCurrentGroups?UUID=${profile.uuid}`);
    const data = await response.json();
    if (data.success) {
      setCurrentGroups(data.groups);
    }
    else alert("something went wrong");
  };

  const getDistance = async () => {
    // TODO: get the current prefered distance willing to travel via api call and get response back
    const response = await fetch(baseURL+`getDistance?UUID=${profile.uuid}`);
    const data = await response.json();
    if (data.success) {
      setDistance(data.distance);
    }
    else alert("something went wrong");
  };

  const updateDistance = async () => {
    // TODO: send the new prefered distance to the api
    const data = {
      UUID: profile.uuid, 
      dist: distance
    };
    const response = await fetch(baseURL+"updateDistance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      alert("Update Complete");
  } else {
      alert("Something went wrong");
  }
  };

  const getInvitedList = async () => {
    // get list of invites from organization accounts
    const response = await fetch(baseURL+`getInvitedList?UUID=${profile.uuid}`);
    const data = await response.json();
    if (data.success) {
      setInvitedToGroups(data.groups);
    }
    else alert("something went wrong");
  };

  // calling the 3 get functions first at page load only once
  useEffect(() => {
    const getData = async () => {
      // await getCurrentGroups();
      // await getDistance();
      await getInvitedList();
      // await getPrefs();
    };
    getData();
  }, []);

  return (
    <div>
      <p>Edit your feed preferences here:</p>
      <input
        type="text"
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
        placeholder="Enter your preferences..."
      />
      <button onClick={updatePreferences}>Update Prefrences</button>
      <p>Current Preferences: {currentPreferences}</p>
      <p>Request to join an organizatino/group:</p>
      <input 
        type="text"
        value={joinAccount}
        onChange={(e) => setJoinAccount(e.target.value)}
        placeholder="Enter account name here"
      />
      <button onClick={sendJoinRequest}>Send Request</button>
      <p>You are currently apart of these groups: {currentGroups}</p>
      <p>These groups are inviting you to join their group/organization</p>
      {invitedToGroups.length > 0 ? (
        invitedToGroups.map((group, index) => (
          <InviteComponent key={index} groupName={group} />
        ))
      ) : (
        <p>No invitations at this time.</p>
      )}
      <p>your current prefered distance is:</p>
      <input
        type='text'
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder='Something went wrong...'
      />
      <button onClick={updateDistance}>Update Disance Preference</button>
    </div>
  );
};

export default RegularUserProfile;