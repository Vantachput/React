import React from 'react';
import { Link } from 'react-router-dom';

const PetCard = ({ pet, onToggleLike }) => {
  // Використовуємо фрагменти <>...</> згідно з вимогами
  return (
    <>
      <div className={`pet-card ${pet.isLiked ? 'liked-card' : ''}`}>
        <div className="pet-photo-container">
          <img src={pet.photo} alt={pet.name} className="pet-photo" />
        </div>
        <div className="pet-info">
          <h3 className="pet-name">{pet.name}</h3>
          <div className="pet-details">
            <span className="species">{pet.species}</span>
            <span className="age">{pet.age} {pet.age === 1 ? 'рік' : 'років'}</span>
          </div>
          <div className="card-actions mt-1">
            <Link to={`/pet/${pet.id}`} className="details-link-btn">
              Детальніше
            </Link>
            <button 
              onClick={() => onToggleLike(pet.id)}
              className={`like-btn ${pet.isLiked ? 'liked' : ''}`}
              title={pet.isLiked ? "Видалити з улюблених" : "Додати в улюблені"}
            >
              {pet.isLiked ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetCard;
