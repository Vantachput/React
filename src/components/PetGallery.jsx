import React from 'react';
import PetCard from './PetCard';

const PetGallery = ({ pets, onToggleLike }) => {
  return (
    <section className="gallery-section">
      <h2 className="page-title">Наші улюбленці</h2>
      
      {/* Умовний рендеринг: перевірка наявності елементів після фільтрації */}
      {pets.length === 0 ? (
        <div className="empty-message">
          <h3>Тваринок не знайдено 😢</h3>
          <p>Спробуйте змінити параметр фільтрації.</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {pets.map(pet => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              onToggleLike={onToggleLike} 
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PetGallery;
