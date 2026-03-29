import React, { useState } from 'react';

const PetCard = ({ pet }) => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  // Використовуємо фрагменти <>...</> згідно з вимогами
  return (
    <>
      <div className="pet-card">
        <img src={pet.photo} alt={pet.name} className="pet-photo" />
        <div className="pet-info">
          <h3 className="pet-name">{pet.name}</h3>
          <div className="pet-details">
            <p><strong>Вид:</strong> {pet.species}</p>
            <p><strong>Вік:</strong> {pet.age} {pet.age === 1 ? 'рік' : 'роки'}</p>
          </div>
          <button 
            className={`like-btn ${likes > 0 ? 'liked' : ''}`} 
            onClick={handleLike}
          >
            {likes > 0 ? `❤️ Спасибі! (${likes})` : '🤍 Лайк'}
          </button>
        </div>
      </div>
    </>
  );
};

export default PetCard;
