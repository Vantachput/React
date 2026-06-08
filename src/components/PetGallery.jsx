import React from 'react';
import PetCard from './PetCard';
import { useSettings } from '../context/SettingsContext';

const PetGallery = ({ pets, onToggleLike, onDelete }) => {
  const { t } = useSettings();

  return (
    <section className="gallery-section">
      <h2 className="page-title">{t('galleryTitle')}</h2>
      
      {/* Умовний рендеринг: перевірка наявності елементів після фільтрації */}
      {pets.length === 0 ? (
        <div className="empty-message">
          <h3>{t('emptyTitle')}</h3>
          <p>{t('emptySubtitle')}</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {pets.map(pet => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              onToggleLike={onToggleLike} 
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PetGallery;
