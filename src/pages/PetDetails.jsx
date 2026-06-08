import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const PetDetails = ({ pets, toggleLike }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, getSpeciesTranslation, getAgeText } = useSettings();

  // Шукаємо тваринку по id (не забуваємо, що id з URL є рядком)
  const pet = pets.find(p => p.id === parseInt(id, 10));

  // Якщо об'єкт не знайдено
  if (!pet) {
    return (
      <div className="page-content not-found-page">
        <h2>{t('detailsNotFoundTitle')}</h2>
        <p>{t('detailsNotFoundText', { id })}</p>
        <button onClick={() => navigate('/pets')} className="submit-btn mt-1">
          {t('detailsBackToList')}
        </button>
      </div>
    );
  }

  return (
    <div className="page-content pet-details-page">
      <div className="details-header">
        {/* Додаткове завдання: кнопка повернутися назад (через Link) */}
        <Link to="/pets" className="back-link">
          {t('detailsBack')}
        </Link>
        <button 
          onClick={() => toggleLike(pet.id)}
          className={`like-btn ${pet.isLiked ? 'liked' : ''}`}
          title={pet.isLiked ? t('cardLikeTitleRemove') : t('cardLikeTitleAdd')}
        >
          {pet.isLiked ? t('detailsLikedBtn') : t('detailsLikeBtn')}
        </button>
      </div>

      <div className="details-card">
        <div className="details-photo-container">
          <img src={pet.photo} alt={pet.name} className="details-photo" />
        </div>
        <div className="details-info">
          <h1>{pet.name}</h1>
          <p className="details-species"><strong>{t('detailsSpecies')}</strong> {getSpeciesTranslation(pet.species)}</p>
          <p className="details-age"><strong>{t('detailsAge')}</strong> {getAgeText(pet.age)}</p>
          
          <div className="details-description">
            <h3>{t('detailsAboutTitle')}</h3>
            <p>
              {t('detailsDescriptionText', {
                name: pet.name,
                species: getSpeciesTranslation(pet.species).toLowerCase(),
                id: pet.id
              })}
            </p>
          </div>
          
          {/* Додаткове завдання: кнопка повернутися назад (через useNavigate) */}
          <button onClick={() => navigate('/pets')} className="submit-btn mt-2">
            {t('detailsToListBtn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
