import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-logo">NIX</h1>
          <ul className="nav-menu">
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
      <div className="hero">
        <div className="hero-content">
          <img 
            src="/profile.JPG" 
            alt="Profile" 
            className="profile-image"
          />
          <h1>Xin chào, tôi là Trang Kim Lợi - 22110371</h1>
          <p>Mobile Developer</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
