import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Input, Badge, Modal } from '../components/ui';
import { useSettings } from '../context/SettingsContext';

export function UiKit() {
  const { t } = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length < 3) {
      setInputError('Текст занадто короткий (мін. 3 символи)');
    } else {
      setInputError('');
    }
  };

  return (
    <div className="page-content" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 className="page-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        🎨 Бібліотека UI-компонентів (UI Kit)
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--color-text-light)', marginBottom: '3rem' }}>
        Документація та жива демонстрація всіх UI-компонентів, створених на базі CSS Modules та дизайн-токенів.
      </p>

      {/* 1. BUTTONS */}
      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          1. Кнопки (Button)
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.8rem', color: 'var(--color-text-light)' }}>Варіанти (Variants):</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '0.8rem', color: 'var(--color-text-light)' }}>Розміри (Sizes):</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Button size="sm">Small (sm)</Button>
              <Button size="md">Medium (md)</Button>
              <Button size="lg">Large (lg)</Button>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '0.8rem', color: 'var(--color-text-light)' }}>Стани (States):</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button variant="primary" disabled>Disabled Primary</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BADGES */}
      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          2. Мітки (Badge)
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Badge variant="primary">Кіт</Badge>
          <Badge variant="secondary">Собака</Badge>
          <Badge variant="success">Улюбленець</Badge>
          <Badge variant="danger">Видалено</Badge>
          <Badge variant="warning">Новий</Badge>
        </div>
      </section>

      {/* 3. INPUTS */}
      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          3. Поля введення (Input)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
          <Input 
            label="Звичайне поле:" 
            placeholder="Введіть текст тут..." 
            value={inputValue}
            onChange={handleInputChange}
            error={inputError}
          />
          <Input 
            label="Заблоковане поле:" 
            placeholder="Цей інпут заблоковано" 
            disabled 
          />
        </div>
      </section>

      {/* 4. CARDS */}
      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          4. Картки (Card)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          <Card>
            <CardHeader>
              <h4 style={{ margin: 0 }}>Заголовок картки</h4>
            </CardHeader>
            <CardBody>
              <p style={{ margin: 0 }}>
                Тіло картки містить опис, текстові поля або будь-який інший довільний контент.
              </p>
            </CardBody>
            <CardFooter>
              <Badge variant="warning">Тест картки</Badge>
              <Button size="sm" variant="outline">Дія</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* 5. MODALS */}
      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          5. Діалогові вікна (Modal)
        </h3>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Відкрити модальне вікно 🚀
        </Button>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Тестове модальне вікно"
        >
          <p style={{ marginBottom: '1.5rem' }}>
            Це кастомне модальне вікно, створене з використанням CSS Modules. Воно блокує прокручування 
            основної сторінки, плавно з'являється та закривається за допомогою хрестика, кліку по задньому фону 
            або кнопки закриття.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
              Скасувати
            </Button>
            <Button variant="danger" size="sm" onClick={() => setIsModalOpen(false)}>
              Підтвердити
            </Button>
          </div>
        </Modal>
      </section>
    </div>
  );
}

export default UiKit;
