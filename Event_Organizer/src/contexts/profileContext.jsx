import React, { createContext, useState, useEffect } from 'react';

export const ProfileContext = createContext();
// this is the context file that allows the app to access profile information
// no matter what page you're on
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const session = sessionStorage.getItem('profile');
    if (session !== null) return JSON.parse(session);
    return -1;
  });

  useEffect(() => {
    sessionStorage.setItem('profile', JSON.stringify(profile));
  }, [profile])

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};