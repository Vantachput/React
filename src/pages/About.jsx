import React from 'react';

const About = () => {
  return (
    <div className="page-content">
      <h2 className="page-title text-center">Про застосунок Pet Gallery</h2>
      
      <div className="about-content details-card" style={{ padding: '2.5rem', maxWidth: '800px', margin: '0 auto', display: 'block' }}>
        <p className="welcome-text text-center" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Цей застосунок створено як фінальний проєкт в рамках курсу вивчення <strong>React</strong>.
        </p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
          🚀 Що реалізовано під капотом:
        </h3>
        
        <ul style={{ lineHeight: '2', listStyleType: 'none', paddingLeft: 0, fontSize: '1.1rem' }}>
          <li>🧩 <strong>Компонентна архітектура:</strong> Побудова надійної ієрархії (Lifting State Up, передача Props).</li>
          <li>⚛️ <strong>Хуки React:</strong> Керування станом та життєвим циклом через <code>useState</code> та <code>useEffect</code>.</li>
          <li>💾 <strong>Local Storage:</strong> Надійна пам'ять прямо у вашому браузері — жоден улюбленець не зникне після F5!</li>
          <li>🌐 <strong>Асинхронний Fetch API:</strong> Інтеграція із зовнішнім світом для витягування даних.</li>
          <li>🗺️ <strong>React Router v6:</strong> Клієнтська маршрутизація, динамічні URL (`/pet/:id`), Layouts, та перенаправлення без перезавантаження браузера.</li>
        </ul>
        
        <div style={{ marginTop: '3rem', textAlign: 'center', borderTop: '2px dashed #edf2f7', paddingTop: '2rem' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Версія застосунку: 1.0.0</p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Розроблено з турботою про пухнастиків 🐾
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

