import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PetGallery from './components/PetGallery';

function App() {
  return (
    <>
      <Header />
      {/* Використовуємо семантичний main */}
      <main className="app-main">
        <PetGallery />
      </main>
      <Footer />
    </>
  );
}

export default App;
