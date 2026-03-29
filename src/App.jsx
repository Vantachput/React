import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PetGallery from './components/PetGallery';

// Джерело даних (масив об’єктів) з початковим станом лайків
const initialPetsData = [
  { id: 1, name: 'Мурзік', species: 'Кіт', age: 3, isLiked: false, photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: 2, name: 'Бобік', species: 'Собака', age: 5, isLiked: false, photo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: 3, name: 'Кеша', species: 'Папуга', age: 1, isLiked: false, photo: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' },
  { id: 4, name: 'Сніжок', species: 'Кролик', age: 2, isLiked: false, photo: 'https://images.pexels.com/photos/4588052/pexels-photo-4588052.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' },
  { id: 5, name: 'Чарлі', species: 'Собака', age: 4, isLiked: false, photo: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: 6, name: 'Сімба', species: 'Кіт', age: 2, isLiked: false, photo: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=400&h=300' },
];

function App() {
  const [pets, setPets] = useState(initialPetsData);
  // Додаємо новий стан для режиму відображення (фільтр)
  const [filter, setFilter] = useState('all');

  const toggleLike = (id) => {
    setPets(prevPets => 
      prevPets.map(pet => 
        pet.id === id ? { ...pet, isLiked: !pet.isLiked } : pet
      )
    );
  };

  const totalLikes = pets.filter(pet => pet.isLiked).length;

  // Фільтруємо колекцію даних на основі поточного стану filter
  const filteredPets = pets.filter(pet => {
    if (filter === 'all') return true;
    if (filter === 'liked') return pet.isLiked;
    if (filter === 'cats') return pet.species === 'Кіт';
    if (filter === 'dogs') return pet.species === 'Собака';
    return true;
  });

  return (
    <>
      {/* Передаємо стан фільтра та обробник змін до Header */}
      <Header 
        totalLikes={totalLikes} 
        currentFilter={filter}
        onFilterChange={setFilter}
      />
      {/* Використовуємо семантичний main */}
      <main className="app-main">
        {/* Передача ВЖЕ ВІДФІЛЬТРОВАНИХ даних вниз по дереву */}
        <PetGallery pets={filteredPets} onToggleLike={toggleLike} />
      </main>
      <Footer />
    </>
  );
}

export default App;
