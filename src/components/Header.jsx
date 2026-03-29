import React from 'react';

const Header = () => {
  return (
    <header className="app-header">
      <h2>🐾 Pet Gallery</h2>
      
      {/* Навігація/Фільтрація (статична, як вимагалося) */}
      <nav className="nav-filters">
        <button className="filter-btn">Всі</button>
        <button className="filter-btn">Коти</button>
        <button className="filter-btn">Собаки</button>
      </nav>
    </header>
  );
};

export default Header;
