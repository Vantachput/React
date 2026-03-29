import React from 'react';

const Header = ({ totalLikes, currentFilter, onFilterChange }) => {
  return (
    <header className="app-header">
      <div className="header-title-container">
        <h2>🐾 Pet Gallery</h2>
        {/* Відображення лічильника лайків, що реактивно змінюється */}
        <span className="likes-counter">Улюблені: {totalLikes} 🤍</span>
      </div>
      
      {/* Панель фільтрів з перемикачами режиму відображення */}
      <nav className="nav-filters">
        <button 
          className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          Всі
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'liked' ? 'active' : ''}`}
          onClick={() => onFilterChange('liked')}
        >
          Улюблені
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'cats' ? 'active' : ''}`}
          onClick={() => onFilterChange('cats')}
        >
          Коти
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'dogs' ? 'active' : ''}`}
          onClick={() => onFilterChange('dogs')}
        >
          Собаки
        </button>
      </nav>
    </header>
  );
};

export default Header;
