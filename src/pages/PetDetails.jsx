import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const PetDetails = ({ pets, toggleLike }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Шукаємо тваринку по id (не забуваємо, що id з URL є рядком)
  const pet = pets.find(p => p.id === parseInt(id, 10));

  // Якщо об'єкт не знайдено
  if (!pet) {
    return (
      <div className="page-content not-found-page">
        <h2>Помилка 😢</h2>
        <p>Улюбленця з ідентифікатором "{id}" не знайдено в нашій базі.</p>
        <button onClick={() => navigate('/pets')} className="submit-btn mt-1">
          Повернутися до списку
        </button>
      </div>
    );
  }

  return (
    <div className="page-content pet-details-page">
      <div className="details-header">
        {/* Додаткове завдання: кнопка повернутися назад (через Link) */}
        <Link to="/pets" className="back-link">
          &larr; Назад до галереї
        </Link>
        <button 
          onClick={() => toggleLike(pet.id)}
          className={`like-btn ${pet.isLiked ? 'liked' : ''}`}
          title={pet.isLiked ? "Видалити з улюблених" : "Додати в улюблені"}
        >
          {pet.isLiked ? '❤️ В улюблених' : '🤍 Додати в улюблені'}
        </button>
      </div>

      <div className="details-card">
        <div className="details-photo-container">
          <img src={pet.photo} alt={pet.name} className="details-photo" />
        </div>
        <div className="details-info">
          <h1>{pet.name}</h1>
          <p className="details-species"><strong>Вид:</strong> {pet.species}</p>
          <p className="details-age"><strong>Вік:</strong> {pet.age} {pet.age === 1 ? 'рік' : 'роки/років'}</p>
          
          <div className="details-description">
            <h3>Про улюбленця:</h3>
            <p>
              Це детальна сторінка для <strong>{pet.name}</strong>. Цей чудовий представник виду {pet.species.toLowerCase()} 
              шукає вашу увагу та любов! Знаходиться в системі під номером #{pet.id}.
            </p>
          </div>
          
          {/* Додаткове завдання: кнопка повернутися назад (через useNavigate) */}
          <button onClick={() => navigate('/pets')} className="submit-btn mt-2">
            До списку
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
