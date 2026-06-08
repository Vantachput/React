import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Button, Badge, Modal } from './ui';
import { useSettings } from '../context/SettingsContext';

export function PetCard({ pet, onToggleLike, onDelete }) {
  const { t, getSpeciesTranslation, getAgeText } = useSettings();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(pet.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Card className={pet.isLiked ? 'liked-card' : ''}>
        <CardHeader style={{ padding: 0 }}>
          <div className="pet-photo-container">
            <img src={pet.photo} alt={pet.name} className="pet-photo" />
          </div>
        </CardHeader>
        
        <CardBody>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h3 className="pet-name" style={{ margin: 0, fontSize: '1.25rem' }}>{pet.name}</h3>
            <Badge variant={pet.isLiked ? 'success' : 'primary'}>
              {getSpeciesTranslation(pet.species)}
            </Badge>
          </div>
          <div className="pet-details">
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-light)' }}>
              {getAgeText(pet.age)}
            </span>
          </div>
        </CardBody>
        
        <CardFooter style={{ gap: '0.5rem' }}>
          <Link to={`/pet/${pet.id}`} style={{ flex: 1, textDecoration: 'none' }}>
            <Button variant="secondary" size="sm" style={{ width: '100%' }}>
              {t('cardDetailsBtn')}
            </Button>
          </Link>
          
          <Button 
            onClick={() => onToggleLike(pet.id)}
            className={pet.isLiked ? 'liked' : ''}
            variant={pet.isLiked ? 'primary' : 'outline'}
            size="sm"
            title={pet.isLiked ? t('cardLikeTitleRemove') : t('cardLikeTitleAdd')}
          >
            {pet.isLiked ? '❤️' : '🤍'}
          </Button>

          {onDelete && (
            <Button 
              onClick={() => setIsDeleteModalOpen(true)}
              variant="danger"
              size="sm"
              title={t('delete')}
            >
              🗑️
            </Button>
          )}
        </CardFooter>
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
    </>
  );
}

export default PetCard;
