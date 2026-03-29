import React, { useState } from 'react';
import PetGallery from '../components/PetGallery';
import AddPetForm from '../components/AddPetForm';

const PetList = ({ pets, addPet, toggleLike }) => {
  // Фільтрація тепер живе на сторінці списку, де вона потрібна
  const [filter, setFilter] = useState('all');

  const filteredPets = pets.filter(pet => {
    if (filter === 'all') return true;
    if (filter === 'liked') return pet.isLiked;
    if (filter === 'cats') return pet.species === 'Кіт';
    if (filter === 'dogs') return pet.species === 'Собака';
    return true;
  });

  return (
    <div className="page-content">
      {/* Локальна навігація/фільтри спеціально для списку тварин */}
      <nav className="nav-filters pet-list-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >Всі</button>
        <button 
          className={`filter-btn ${filter === 'liked' ? 'active' : ''}`}
          onClick={() => setFilter('liked')}
        >Улюблені</button>
        <button 
          className={`filter-btn ${filter === 'cats' ? 'active' : ''}`}
          onClick={() => setFilter('cats')}
        >Коти</button>
        <button 
          className={`filter-btn ${filter === 'dogs' ? 'active' : ''}`}
          onClick={() => setFilter('dogs')}
        >Собаки</button>
      </nav>

      {filter === 'all' && <AddPetForm onAddPet={addPet} />}
      
      <PetGallery pets={filteredPets} onToggleLike={toggleLike} />
    </div>
  );
};

export default PetList;
