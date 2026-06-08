import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardBody, Button, Badge, Modal } from '../components/ui';
import { useSettings } from '../context/SettingsContext';

const PetDetails = ({ pets, toggleLike, deletePet }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, getSpeciesTranslation, getAgeText } = useSettings();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Шукаємо тваринку по id (не забуваємо, що id з URL є рядком)
  const pet = pets.find(p => p.id === parseInt(id, 10));

  // Якщо об'єкт не знайдено
  if (!pet) {
    return (
      <div className="page-content not-found-page">
        <h2>{t('detailsNotFoundTitle')}</h2>
        <p>{t('detailsNotFoundText', { id })}</p>
        <Link to="/pets">
          <Button variant="primary" className="mt-1">
            {t('detailsBackToList')}
          </Button>
        </Link>
      </div>
    );
  }

  const handleDeleteConfirm = () => {
    deletePet(pet.id);
    setIsDeleteModalOpen(false);
    navigate('/pets');
  };

  return (
    <div className="page-content pet-details-page">
      <div className="details-header">
        {/* Додаткове завдання: кнопка повернутися назад (через Link) */}
        <Link to="/pets" className="back-link" style={{ textDecoration: 'none' }}>
          <Button variant="secondary" size="sm">
            {t('detailsBack')}
          </Button>
        </Link>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button 
            onClick={() => toggleLike(pet.id)}
            variant={pet.isLiked ? 'primary' : 'outline'}
            size="sm"
            title={pet.isLiked ? t('cardLikeTitleRemove') : t('cardLikeTitleAdd')}
          >
            {pet.isLiked ? t('detailsLikedBtn') : t('detailsLikeBtn')}
          </Button>
          {deletePet && (
            <Button 
              onClick={() => setIsDeleteModalOpen(true)}
              variant="danger"
              size="sm"
            >
              {t('delete')} 🗑️
            </Button>
          )}
        </div>
      </div>

      <Card style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <div className="details-photo-container" style={{ flex: '1 1 300px', minHeight: '300px' }}>
          <img src={pet.photo} alt={pet.name} className="details-photo" />
        </div>
        <CardBody style={{ flex: '1 1 300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ margin: 0 }}>{pet.name}</h1>
            <Badge variant={pet.isLiked ? 'success' : 'primary'}>
              {getSpeciesTranslation(pet.species)}
            </Badge>
          </div>
          
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
          <Button onClick={() => navigate('/pets')} variant="secondary" className="mt-2">
            {t('detailsToListBtn')}
          </Button>
        </CardBody>
      </Card>

      {/* Модальне вікно підтвердження видалення */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t('deleteConfirmTitle')}
      >
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.5' }}>
          {t('deleteConfirmText', { name: <strong>{pet.name}</strong> })}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Button variant="secondary" size="sm" onClick={() => setIsDeleteModalOpen(false)}>
            {t('cancel')}
          </Button>
          <Button variant="danger" size="sm" onClick={handleDeleteConfirm}>
            {t('confirm')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PetDetails;
