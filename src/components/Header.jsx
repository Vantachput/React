import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = ({ totalLikes }) => {
  return (
    <header className="app-header">
      <Link to="/" className="logo-link">
        <h1>🐾 Pet Gallery</h1>
      </Link>
      
      {/* Навігація всередині шапки по центру */}
      <nav className="nav-filters main-nav">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => `filter-btn ${isActive ? 'active' : ''}`}
        >
          Головна
        </NavLink>
        <NavLink 
          to="/pets" 
          className={({ isActive }) => `filter-btn ${isActive ? 'active' : ''}`}
        >
          Галерея 
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => `filter-btn ${isActive ? 'active' : ''}`}
        >
          Про застосунок
        </NavLink>
      </nav>

      <div className="stats">
        <span className="likes-counter">
          ❤️ Улюбленців: {totalLikes}
        </span>
      </div>
    </header>
  );
};

export default Header;

