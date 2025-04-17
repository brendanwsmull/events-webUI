import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfileContext } from '../contexts/profileContext';
import './Header.css';

function Header() {
  const { profile } = useContext(ProfileContext);
  
  return (
    <div className="header-container">
      <h1 className="header-title">Events Hub</h1>
      <nav className="header-nav">
        <ul>
          <li>
            {profile.accountType === 1 && (
              <NavLink to="/app/feed" className={({ isActive }) => isActive ? 'active' : ''}>
                Feed
              </NavLink>
            )}
          </li>
          <li>
            <NavLink to="/app/post" className={({ isActive }) => isActive ? 'active' : ''}>
              Post
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/profile" className={({ isActive }) => isActive ? 'active' : ''}>
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
