import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="app-header d-flex align-items-center justify-content-between">
      <div className="header-title d-flex align-items-center">
        <span className="logo-box">mp</span>
        <span className="ms-2">myp@intings</span>
      </div>
      <nav className="main-nav d-flex align-items-center">
        <NavLink to="/gallery" className="nav-link">Gallery</NavLink>
        <NavLink to="/my-artwork" className="nav-link">My artwork</NavLink>
        <NavLink to="/my-sales" className="nav-link">My sales</NavLink>
        <NavLink to="/messages" className="nav-link">Messages</NavLink>
        <span className="profile-icon ms-3">
          <button className="btn btn-light rounded-circle p-2">
            <i className="bi bi-person" style={{ fontSize: '1.5rem' }}></i>
          </button>
        </span>
      </nav>
    </header>
  );
}

export default Header; 