ЗВІТ ПРО ВИКОНАННЯ ПРАКТИЧНОГО ЗАВДАННЯ
Тема: Дизайн-токени та бібліотека UI-компонентів на CSS Modules у React-застосунку

1. МЕТА РОБОТИ
Набути практичних навичок розробки масштабованої дизайн-системи на основі CSS-змінних (дизайн-токени) та створення бібліотеки перевикористовуваних UI-компонентів із використанням технології CSS Modules у React-застосунку.

2. ПОСТАВЛЕНІ ЗАВДАННЯ

2.1. Обов'язкова частина:
- Створити файл дизайн-токенів src/styles/tokens.css із CSS-змінними для обох тем.
- Підключити tokens.css у main.jsx до інших стилів.
- Реалізувати компонент Button з CSS Modules із підтримкою варіантів primary, secondary, danger, outline.
- Реалізувати компонент Card з CSS Modules із зонами: заголовок, тіло, підвал.
- Реалізувати компонент Input з CSS Modules із підтримкою label, placeholder, disabled та станом фокусу.
- Створити єдину точку експорту src/components/ui/index.js.
- Використати UI-компоненти у щонайменше двох доменних компонентах.

2.2. Додаткові завдання:
- Реалізувати власну утилітарну функцію cn() для умовного поєднання класів CSS Modules (аналог clsx).
- Додати четвертий UI-компонент Badge (мітка статусу виду тварини та лайків) та п'ятий Modal (діалог підтвердження видалення).
- Реалізувати систему анімованого переключення теми з CSS-переходами на семантичних змінних.
- Реалізувати автовизначення системної теми через prefers-color-scheme та відображати індикатор AUTO в кнопці перемикача.
- Написати документацію UI-компонентів у вигляді сторінки /ui-kit.

3. ХІД ВИКОНАННЯ РОБОТИ

3.1. Файл дизайн-токенів src/styles/tokens.css
Створено централізований файл токенів, що визначає CSS-змінні для обох тем. Файл охоплює кольори, типографіку, відступи та радіуси країв.

Код файлу tokens.css (фрагмент):
```css
:root {
  /* Кольори */
  --color-primary: #5d9cec;
  --color-primary-hover: #4a89dc;
  --color-secondary: #ffce54;
  --color-danger: #fc6e51;
  --color-danger-hover: #e9573f;
  --color-success: #a0d468;

  --color-bg: #f5f7fa;
  --color-card-bg: #ffffff;
  --color-text: #333333;
  --color-text-light: #777777;
  --color-border: #e6e9ed;

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);

  /* Типографіка */
  --font-family: 'Segoe UI', Roboto, -apple-system, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-weight-normal: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Відступи */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;

  /* Краї */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
  --border-radius-full: 9999px;
}

[data-theme='dark'] {
  --color-bg: #121212;
  --color-card-bg: #1e1e1e;
  --color-text: #e0e0e0;
  --color-text-light: #a0a0a0;
  --color-border: #2d2d2d;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
}
```

Файл підключено у src/main.jsx першим у ланцюжку імпортів CSS:
```javascript
import './styles/tokens.css'
import './styles/global.css'
import './styles/router-fixes.css'
```

3.2. Утиліта cn() для поєднання класів (src/utils/cn.js)
Реалізовано власну функцію для умовного об'єднання класів CSS Modules — аналог популярних бібліотек clsx / classnames. Функція приймає рядки, масиви та об'єкти формату { клас: boolean }.

Код файлу cn.js:
```javascript
export function cn(...inputs) {
  const classes = [];
  for (let i = 0; i < inputs.length; i++) {
    const arg = inputs[i];
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = cn(...arg);
        if (inner) classes.push(inner);
      }
    } else if (argType === 'object') {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(' ');
}
```

3.3. UI-компонент Button (src/components/ui/Button/)
Компонент підтримує чотири варіанти: primary, secondary, danger, outline; три розміри: sm, md, lg; стан disabled та передачу всіх стандартних HTML-атрибутів через ...rest.

Код файлу Button.jsx:
```javascript
import React from 'react';
import { cn } from '../../../utils/cn';
import classes from './Button.module.css';

export function Button({ children, variant = 'primary', size = 'md',
                         disabled = false, className, ...rest }) {
  return (
    <button
      className={cn(classes.btn, classes[variant], classes[size],
                    { [classes.disabled]: disabled }, className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
```

Файл стилів Button.module.css визначає: базовий клас .btn з focus-visible кільцем, варіанти кольорів через CSS-токени, розміри та стан .disabled з opacity: 0.5 та cursor: not-allowed.

3.4. UI-компонент Card (src/components/ui/Card/)
Компонент реалізовано як складений (compound component), що складається з Card, CardHeader, CardBody, CardFooter. Кожна зона має власні відступи, межі та тлові кольори, що реагують на зміну теми через CSS-змінні.

Код файлу Card.jsx (фрагмент):
```javascript
export function Card({ children, className, ...rest }) {
  return <div className={cn(classes.card, className)} {...rest}>{children}</div>;
}
export function CardHeader({ children, className, ...rest }) {
  return <div className={cn(classes.header, className)} {...rest}>{children}</div>;
}
export function CardBody({ children, className, ...rest }) {
  return <div className={cn(classes.body, className)} {...rest}>{children}</div>;
}
export function CardFooter({ children, className, ...rest }) {
  return <div className={cn(classes.footer, className)} {...rest}>{children}</div>;
}
```

Файл стилів Card.module.css задає transition: background-color 0.3s ease для адаптації до зміни теми, а також [data-theme='dark'] .header та [data-theme='dark'] .footer — окремі напівпрозорі перекриття для темного режиму.

3.5. UI-компонент Input (src/components/ui/Input/)
Компонент реалізує обгортку з міткою (label), полем введення та повідомленням про помилку. Використовує хук useId() для зв'язку label та input через унікальний ідентифікатор.

Код файлу Input.jsx:
```javascript
import React, { useId } from 'react';
import { cn } from '../../../utils/cn';
import classes from './Input.module.css';

export function Input({ label, placeholder, disabled = false,
                        error, className, ...rest }) {
  const id = useId();
  return (
    <div className={cn(classes.container, { [classes.disabled]: disabled }, className)}>
      {label && <label htmlFor={id} className={classes.label}>{label}</label>}
      <input id={id} placeholder={placeholder} disabled={disabled}
             className={cn(classes.input, { [classes.error]: error })} {...rest} />
      {error && <span className={classes.errorMessage}>{error}</span>}
    </div>
  );
}
```

Стан фокусу реалізовано через:
```css
.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(93, 156, 236, 0.25);
}
```

3.6. UI-компонент Badge (src/components/ui/Badge/)
Компонент відображає компактну мітку-пілюлю зі статусом. Підтримувані варіанти: primary, secondary, success, danger, warning. Використовується для відображення виду тварини на картках галереї та сторінці деталей.

3.7. UI-компонент Modal (src/components/ui/Modal/)
Компонент реалізує модальне діалогове вікно з напівпрозорим фоном-накладкою (backdrop-filter: blur). Закривається за натисканням на фон або кнопку «×». Заблоковує прокручування сторінки через document.body.style.overflow = 'hidden'. Реалізовано анімацію появи через keyframes:

```css
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
```

Використовується для підтвердження видалення улюбленця з галереї та на сторінці деталей.

3.8. Єдина точка експорту (src/components/ui/index.js)
```javascript
export { default as Button }              from './Button/Button';
export { default as Card,
         CardHeader, CardBody, CardFooter } from './Card/Card';
export { default as Input }              from './Input/Input';
export { default as Badge }              from './Badge/Badge';
export { default as Modal }              from './Modal/Modal';
```

Приклад використання у доменному компоненті:
```javascript
import { Card, CardHeader, CardBody, CardFooter, Button, Badge, Modal }
  from '../components/ui';
```

3.9. Інтеграція у доменні компоненти

Замінено «голі» HTML-елементи на модульні UI-компоненти у двох ключових доменних файлах:

а) src/components/PetCard.jsx
- Картка повністю замінена на <Card> + <CardHeader> + <CardBody> + <CardFooter>.
- Вид тварини відображається через <Badge variant="primary">.
- Кнопки «Детальніше», «Лайк» та «Видалити» замінені на <Button variant="...">.
- Кнопка «Видалити» відкриває <Modal> для підтвердження видалення.

б) src/pages/PetDetails.jsx
- Деталі улюбленця відображаються у <Card> + <CardBody>.
- Ім'я та вид позначено через <Badge>.
- Усі кнопки навігації та дій замінені на <Button variant="...">.
- Видалення підтверджується через <Modal>.

в) src/components/AddPetForm.jsx
- Поля «Ім'я» та «Вік» замінені на компонент <Input> з підтримкою label та error.
- Кнопка «Додати до галереї» замінена на <Button variant="primary">.
- Додано URL-валідацію фото з відображенням помилки через error-стан Input.

3.10. Автовизначення системної теми та індикатор AUTO
У компоненті ThemeProvider (ThemeContext.jsx) реалізовано слухач:
```javascript
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', handleChange);
```

У Header.jsx додано умовний рендеринг індикатора AUTO:
```javascript
{!localStorage.getItem('app-theme') && (
  <span style={{ position: 'absolute', top: '-4px', right: '-4px',
                 backgroundColor: 'var(--color-secondary)',
                 fontSize: '8px', padding: '1px 3px',
                 borderRadius: '4px', fontWeight: 'bold' }}>
    AUTO
  </span>
)}
```

3.11. Сторінка документації /ui-kit (src/pages/UiKit.jsx)
Створено окрему сторінку-демонстрацію, доступну за маршрутом /ui-kit, де відображено всі варіанти кожного компонента:
- Button: варіанти primary, secondary, danger, outline; розміри sm, md, lg; стан disabled.
- Badge: варіанти primary, secondary, success, danger, warning.
- Input: звичайний стан, стан з помилкою валідації, заблокований стан.
- Card: картка з Header, Body та Footer, демонстрація реакції на тему.
- Modal: інтерактивна кнопка відкриття модального вікна.

Посилання «UI Kit» додано до головного навігаційного меню у Header.jsx.

4. РЕЗУЛЬТАТИ ВИКОНАННЯ ТА ТЕСТУВАННЯ

Для верифікації коректності всього коду виконано виробничу збірку:
`npm run build`

Результат:
```
vite v8.0.3 building client environment for production...
transforming... ✓ 53 modules transformed.
dist/index.html                    0.45 kB │ gzip:  0.29 kB
dist/assets/index-CBo51TxW.css    16.43 kB │ gzip:  3.55 kB
dist/assets/index-BlFKQ-Ur.js    266.84 kB │ gzip: 84.18 kB

✓ built in 313ms
```

Збірка завершена успішно. Кількість оброблених модулів зросла з 39 (до виконання роботи) до 53 (після), що підтверджує коректне підключення всіх нових компонентів. Розмір CSS-бандлу зріс з 9.49 кБ до 16.43 кБ — за рахунок CSS Modules нових компонентів.

Під час ручного тестування підтверджено:
1. Кнопка «Видалити» на картці та сторінці деталей відкриває модальне вікно підтвердження.
2. Підтвердження в Modal видаляє запис зі стану і зі збереженого localStorage.
3. Поле «Фото URL» у формі додавання показує стан error (червона рамка + підпис помилки) при некоректному введенні.
4. Компонент Input демонструє чітке синє кільце при фокусі.
5. При першому відвідуванні (порожній localStorage) кнопка теми показує індикатор AUTO.
6. Перехід між темами відбувається плавно завдяки CSS transition на всіх ключових елементах.

5. СТРУКТУРА НОВИХ ФАЙЛІВ

src/
├── styles/
│   └── tokens.css              ← нові дизайн-токени
├── utils/
│   └── cn.js                   ← утиліта об'єднання класів
└── components/
    └── ui/
        ├── index.js             ← єдина точка експорту
        ├── Button/
        │   ├── Button.jsx
        │   └── Button.module.css
        ├── Card/
        │   ├── Card.jsx
        │   └── Card.module.css
        ├── Input/
        │   ├── Input.jsx
        │   └── Input.module.css
        ├── Badge/
        │   ├── Badge.jsx
        │   └── Badge.module.css
        └── Modal/
            ├── Modal.jsx
            └── Modal.module.css

Нові маршрути:
/ui-kit   ← сторінка документації бібліотеки компонентів

6. ВИСНОВКИ
Під час виконання практичного завдання було створено повноцінну дизайн-систему для React-застосунку. Застосування CSS-токенів дозволило централізувати всі стилістичні константи та уникнути дублювання. CSS Modules надали ізоляцію стилів та зробили компоненти повністю незалежними. Реалізована утиліта cn() забезпечує чисте і безпечне поєднання класів при умовному рендерингу. Усі доменні компоненти були успішно оновлені для використання нової бібліотеки, а сторінка /ui-kit стала живою документацією системи.
