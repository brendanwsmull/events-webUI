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
  const baseURL = 'http://localhost:5000/';

  const updatePreferences = async () => {
    // TODO: send api request to insert new string of prefrences
    // TODO: update preferences state to reflect what was inside the box
  };

  const sendJoinRequest = async () => {
    // TODO: send api request to join account
  };

  const getCurrentGroups = async () => {
    // TODO: get list of current groups and display them in a string inside of currentGroups
  };

  const getDistance = async () => {
    // TODO: get the current prefered distance willing to travel via api call and get response back
  };

  const updateDistance = async () => {
    // TODO: send the new prefered distance to the api
  };

  const getInvitedList = async () => {
    // TODO: get list of invites from organization accounts
  };

  // calling the 3 get functions first
  useEffect(() => {
    const getData = async () => {
      await getCurrentGroups();
      await getDistance();
      await getInvitedList();
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
      <InviteComponent />
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