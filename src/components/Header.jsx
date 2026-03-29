import React from 'react';

const Header = ({ totalLikes }) => {
  return (
    <header className="app-header">
      <div className="header-title-container">
        <h2>🐾 Pet Gallery</h2>
        {/* Відображення лічильника лайків, що реактивно змінюється */}
        <span className="likes-counter">Улюблені: {totalLikes} 🤍</span>
      </div>
      
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
