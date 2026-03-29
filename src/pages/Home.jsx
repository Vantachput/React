import React from 'react';
import PetOwnersAPI from '../components/PetOwnersAPI';

const Home = () => {
  return (
    <div className="page-content">
      <h2 className="page-title">Ласкаво просимо до Pet Gallery! 🐾</h2>
      <p className="welcome-text">
        Це ваш персональний простір для керування та перегляду улюблених тваринок. 
        Тут ви можете знайти нових друзів або додати своїх власних.
      </p>
      
      <div className="home-stats">
        <h3>Чому ми найкращі?</h3>
        <ul>
          <li>🐶 Величезна база пухнастиків</li>
          <li>🐰 Зручний пошук та фільтрація</li>
          <li>🦜 Спільнота власників з усього світу</li>
        </ul>
      </div>

      <hr className="section-divider" />
      <PetOwnersAPI />
    </div>
  );
};

export default Home;
