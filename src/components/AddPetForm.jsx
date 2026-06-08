import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';

const AddPetForm = ({ onAddPet }) => {
  const { t } = useSettings();
  // Керовані поля форми через state
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Кіт');
  const [age, setAge] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  // Дефолтні картинки під кожен вид
  const defaultPhotos = {
    'Кіт': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400&h=300',
    'Собака': 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400&h=300',
    'Папуга': 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    'Кролик': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=400&h=300'
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Заборона стандартного перезавантаження
    
    // Мінімальна валідація - не додавати порожніх імен (trim)
    if (!name.trim()) return;

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
  };

  return (
    <form className="add-pet-form" onSubmit={handleSubmit}>
      <h3>{t('addFormTitle')}</h3>
      
      <div className="form-group">
        <label htmlFor="pet-name">{t('formName')}</label>
        <input 
          type="text" 
          id="pet-name" 
          className="form-input"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder={t('formNamePlaceholder')}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="pet-species">{t('formSpecies')}</label>
          <select 
            id="pet-species" 
            className="form-input"
            value={species} 
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option value="Кіт">{t('speciesCat')}</option>
            <option value="Собака">{t('speciesDog')}</option>
            <option value="Папуга">{t('speciesParrot')}</option>
            <option value="Кролик">{t('speciesRabbit')}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="pet-age">{t('formAge')}</label>
          <input 
            type="number" 
            id="pet-age" 
            className="form-input"
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            min="0"
            max="30"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="pet-photo">{t('formPhoto')}</label>
        <input 
          type="url" 
          id="pet-photo" 
          className="form-input"
          value={photoUrl} 
          onChange={(e) => setPhotoUrl(e.target.value)} 
          placeholder={t('formPhotoPlaceholder')}
        />
        <small className="form-hint">{t('formPhotoHint')}</small>
      </div>

      <button type="submit" className="submit-btn" disabled={!name.trim()}>
        {t('formSubmit')}
      </button>
    </form>
  );
};

export default AddPetForm;
