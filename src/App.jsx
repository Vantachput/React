import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PetGallery from './components/PetGallery';
import AddPetForm from './components/AddPetForm';
import PetOwnersAPI from './components/PetOwnersAPI';

// Джерело даних (масив об’єктів) з початковим станом лайків
const initialPetsData = [
  { id: 1, name: 'Мурзік', species: 'Кіт', age: 3, isLiked: false, photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: 2, name: 'Бобік', species: 'Собака', age: 5, isLiked: false, photo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: 3, name: 'Кеша', species: 'Папуга', age: 1, isLiked: false, photo: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' },
  { id: 4, name: 'Сніжок', species: 'Кролик', age: 2, isLiked: false, photo: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: 5, name: 'Чарлі', species: 'Собака', age: 4, isLiked: false, photo: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: 6, name: 'Сімба', species: 'Кіт', age: 2, isLiked: false, photo: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=400&h=300' },
];

function App() {
  // 1. Ініціалізація стану з перевіркою localStorage (lazy initialization)
  const [pets, setPets] = useState(() => {
    const savedPets = localStorage.getItem('pet-gallery-data');
    if (savedPets) {
      try {
        return JSON.parse(savedPets);
      } catch (error) {
        console.error('Помилка парсингу localStorage:', error);
        return initialPetsData;
      }
    }
    return initialPetsData;
  });

  const [filter, setFilter] = useState('all');

  // 2. Автоматичне збереження масиву даних у localStorage при кожній зміні стану pets
  useEffect(() => {
    localStorage.setItem('pet-gallery-data', JSON.stringify(pets));
  }, [pets]);

  const toggleLike = (id) => {
    setPets(prevPets => 
      prevPets.map(pet => 
        pet.id === id ? { ...pet, isLiked: !pet.isLiked } : pet
      )
    );
  };

  const addPet = (newPet) => {
    setPets(prevPets => [...prevPets, newPet]);
  };

  const totalLikes = pets.filter(pet => pet.isLiked).length;

  const filteredPets = pets.filter(pet => {
    if (filter === 'all') return true;
    if (filter === 'liked') return pet.isLiked;
    if (filter === 'cats') return pet.species === 'Кіт';
    if (filter === 'dogs') return pet.species === 'Собака';
    return true;
  });

  return (
    <>
      <Header 
        totalLikes={totalLikes} 
        currentFilter={filter}
        onFilterChange={setFilter}
      />
      <main className="app-main">
        {filter === 'all' && <AddPetForm onAddPet={addPet} />}
        
        <PetGallery pets={filteredPets} onToggleLike={toggleLike} />

        {/* Секція з даними із відкритого API */}
        <hr className="section-divider" />
        <PetOwnersAPI />
      </main>
      <Footer />
    </>
  );
}

export default App;
