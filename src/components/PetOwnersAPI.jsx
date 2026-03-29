import React, { useState, useEffect } from 'react';

const PetOwnersAPI = () => {
  // 1. Стани інтерфейсу
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Асинхронний fetch-запит в useEffect з порожнім масивом залежностей
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        setLoading(true); // Встановлюємо стан завантаження
        
        // Штучна затримка для демонстрації стану "Loading" (на вимогу лабораторної)
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        // Використовуємо Fetch API (без сторонніх бібліотек)
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // 3. Перевірка response.ok
        if (!response.ok) {
          throw new Error(`Помилка запиту: ${response.status}`);
        }
        
        const data = await response.json();
        setOwners(data); // Зберігаємо дані в state
      } catch (err) {
        // 4. Обробка помилок через try/catch
        setError(err.message);
      } finally {
        setLoading(false); // Завжди вимикаємо loading після завершення
      }
    };

    fetchOwners();
  }, []); // [] - гарантує що запит піде 1 раз при монтуванні

  // Відображення стану Loading
  if (loading) {
    return (
      <section className="api-section">
        <h2 className="page-title">Спільнота власників (із API)</h2>
        <div className="api-state api-loading">
          <p>Завантаження даних із сервера... ⏳</p>
        </div>
      </section>
    );
  }

  // Відображення стану Error
  if (error) {
    return (
      <section className="api-section">
        <h2 className="page-title">Спільнота власників (із API)</h2>
        <div className="api-state api-error">
          <p>❌ Не вдалося завантажити дані: {error}</p>
          <p className="error-hint">Перевірте підключення до мережі або URL ендпоінту.</p>
        </div>
      </section>
    );
  }

  // Відображення стану Success (Дані завантажено)
  return (
    <section className="api-section">
      <h2 className="page-title">Спільнота власників (із API)</h2>
      <div className="owners-grid">
        {/* 5. Відображення через map() з ключем key */}
        {owners.slice(0, 6).map(owner => (
          <div key={owner.id} className="owner-card">
            <h4>{owner.name}</h4>
            <p className="owner-detail"><strong>Місто:</strong> {owner.address.city}</p>
            <p className="owner-detail"><strong>Email:</strong> {owner.email}</p>
            <p className="owner-detail"><strong>Компанія:</strong> {owner.company.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PetOwnersAPI;
