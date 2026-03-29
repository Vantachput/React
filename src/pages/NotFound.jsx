import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-content not-found-page api-state api-error text-center">
      <h1 className="error-title">404</h1>
      <h2>Сторінку не знайдено</h2>
      <p>Схоже, що ви перейшли за неправильним посиланням або ця сторінка була видалена.</p>
      <Link to="/" className="submit-btn mt-2 inline-block">
        На головну
      </Link>
    </div>
  );
};

export default NotFound;
