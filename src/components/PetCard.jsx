import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const PetCard = ({ pet, onToggleLike }) => {
  const { t, getSpeciesTranslation, getAgeText } = useSettings();

  // Використовуємо фрагменти <>...</> згідно з вимогами
  return (
    <>
      <div className={`pet-card ${pet.isLiked ? 'liked-card' : ''}`}>
        <div className="pet-photo-container">
          <img src={pet.photo} alt={pet.name} className="pet-photo" />
        </div>
        <div className="pet-info">
          <h3 className="pet-name">{pet.name}</h3>
          <div className="pet-details">
            <span className="species">{getSpeciesTranslation(pet.species)}</span>
            <span className="age">{getAgeText(pet.age)}</span>
          </div>
          <div className="card-actions mt-1">
            <Link to={`/pet/${pet.id}`} className="details-link-btn">
              {t('cardDetailsBtn')}
            </Link>
            <button 
              onClick={() => onToggleLike(pet.id)}
              className={`like-btn ${pet.isLiked ? 'liked' : ''}`}
              title={pet.isLiked ? t('cardLikeTitleRemove') : t('cardLikeTitleAdd')}
            >
              {pet.isLiked ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetCard;
