import React, { useState } from 'react';
import { Input, Button } from './ui';
import { useSettings } from '../context/SettingsContext';

const AddPetForm = ({ onAddPet }) => {
  const { t } = useSettings();
  // Керовані поля форми через state
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Кіт');
  const [age, setAge] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoError, setPhotoError] = useState('');

  // Дефолтні картинки під кожен вид
  const defaultPhotos = {
    'Кіт': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400&h=300',
    'Собака': 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400&h=300',
    'Папуга': 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    'Кролик': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=400&h=300'
  };

  const handlePhotoUrlChange = (e) => {
    const value = e.target.value;
    setPhotoUrl(value);
    
    if (value.trim() && !value.trim().startsWith('http://') && !value.trim().startsWith('https://')) {
      setPhotoError('Посилання має починатися з http:// або https://');
    } else {
      setPhotoError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Заборона стандартного перезавантаження
    
    // Мінімальна валідація - не додавати порожніх імен (trim)
    if (!name.trim() || photoError) return;

    // Сворення об'єкта для нового елемента
    const newPet = {
      id: Date.now(), // Унікальний ідентифікатор
      name: name.trim(),
      species,
      age: age ? parseInt(age, 10) : 1, // Вік за замовчуванням 1
      isLiked: false,
      // Використовуємо вказаний URL або дефолтне фото за видом
      photo: photoUrl.trim() || defaultPhotos[species]
    };

    // Виклик переданої через props функції
    onAddPet(newPet);

    // Очищення полів форми
    setName('');
    setSpecies('Кіт');
    setAge('');
    setPhotoUrl('');
    setPhotoError('');
  };

  return (
    <form className="add-pet-form" onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{t('addFormTitle')}</h3>
      
      <Input
        label={t('formName')}
        placeholder={t('formNamePlaceholder')}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ marginBottom: '1rem' }}
      />

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
          <label htmlFor="pet-species" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            {t('formSpecies')}
          </label>
          <select 
            id="pet-species" 
            className="form-input"
            value={species} 
            onChange={(e) => setSpecies(e.target.value)}
            style={{ width: '100%', padding: '0.75rem' }}
          >
            <option value="Кіт">{t('speciesCat')}</option>
            <option value="Собака">{t('speciesDog')}</option>
            <option value="Папуга">{t('speciesParrot')}</option>
            <option value="Кролик">{t('speciesRabbit')}</option>
          </select>
        </div>

        <Input
          type="number"
          label={t('formAge')}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="0"
          max="30"
          style={{ flex: 1 }}
        />
      </div>

      <Input
        type="url"
        label={t('formPhoto')}
        placeholder={t('formPhotoPlaceholder')}
        value={photoUrl}
        onChange={handlePhotoUrlChange}
        error={photoError}
      />
      <small className="form-hint" style={{ display: 'block', marginTop: '0.25rem', marginBottom: '1.5rem' }}>
        {t('formPhotoHint')}
      </small>

      <Button type="submit" variant="primary" style={{ width: '100%' }} disabled={!name.trim() || !!photoError}>
        {t('formSubmit')}
      </Button>
    </form>
  );
};

export default AddPetForm;
