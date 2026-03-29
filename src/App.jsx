import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PetList from './pages/PetList';
import PetDetails from './pages/PetDetails';
import About from './pages/About';
import NotFound from './pages/NotFound';

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

  return (
    <Routes>
      {/* Базовий Layout-компонент, який обгортає всі сторінки */}
      <Route path="/" element={<Layout totalLikes={totalLikes} />}>
        
        {/* Головна сторінка */}
        <Route index element={<Home />} />
        
        {/* Сторінка списку улюбленців */}
        <Route path="pets" element={<PetList pets={pets} addPet={addPet} toggleLike={toggleLike} />} />
        
        {/* Динамічний маршрут сторінки деталей. :id - змінний параметр */}
        <Route path="pet/:id" element={<PetDetails pets={pets} toggleLike={toggleLike} />} />
        
        {/* Довідкова сторінка */}
        <Route path="about" element={<About />} />

        {/* Додаткове завдання: редирект (застарілий URL animals кидає на pets) */}
        <Route path="animals" element={<Navigate to="/pets" replace />} />
        
        {/* Сторінка "Не знайдено" (404 Not Found) */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
