import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();
// this is the context file that allows the app to access profile information
// no matter what page you're on
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(5);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};