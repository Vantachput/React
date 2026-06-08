import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';

const Header = ({ totalLikes }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useSettings();

  return (
    <header className="app-header">
      <Link to="/" className="logo-link">
        <h1>{t('logoTitle')}</h1>
      </Link>
      
      {/* Навігація всередині шапки по центру */}
      <nav className="nav-filters main-nav">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => `filter-btn ${isActive ? 'active' : ''}`}
        >
          {t('navHome')}
        </NavLink>
        <NavLink 
          to="/pets" 
          className={({ isActive }) => `filter-btn ${isActive ? 'active' : ''}`}
        >
          {t('navGallery')}
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => `filter-btn ${isActive ? 'active' : ''}`}
        >
          {t('navAbout')}
        </NavLink>
      </nav>

      <div className="stats" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span className="likes-counter">
          {t('likesCount', { count: totalLikes })}
        </span>
        
        {/* Кнопка перемикання теми */}
        <button 
          onClick={toggleTheme} 
          className="filter-btn theme-toggle-btn"
          title={theme === 'light' ? t('toggleThemeDark') : t('toggleThemeLight')}
          aria-label="Toggle theme"
          style={{ padding: '0.5rem 0.8rem', fontSize: '1.1rem', cursor: 'pointer' }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Кнопка перемикання мови */}
        <button 
          onClick={toggleLanguage} 
          className="filter-btn lang-toggle-btn"
          title={t('langSwitch')}
          aria-label="Toggle language"
          style={{ padding: '0.5rem 0.8rem', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {language === 'ua' ? 'EN' : 'UA'}
        </button>
      </div>
    </header>
  );
};

export default Header;

