import React from 'react';
import PetCard from './PetCard';

const PetGallery = ({ pets, onToggleLike }) => {
  return (
    <section className="gallery-section">
      <h2 className="page-title">Наші улюбленці</h2>
      <div className="gallery-grid">
        {/* Використання map() для рендеру списку карточок */}
        {/* Передача даних та колбека вниз по дереву: рівень 2 */}
        {pets.map(pet => (
          <PetCard 
            key={pet.id} 
            pet={pet} 
            onToggleLike={onToggleLike} 
          />
        ))}
      </div>
    </section>
  );
};

export default PetGallery;
