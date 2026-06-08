ЗВІТ ПРО ВИКОНАННЯ ПРАКТИЧНОГО ЗАВДАННЯ
Тема: Впровадження React Context для керування темами оформлення та локалізації інтерфейсу

1. МЕТА РОБОТИ
Набути практичних навичок роботи з React Context API для створення глобального стану додатка. Реалізувати динамічне перемикання кольорових тем (світла/темна) та локалізацію інтерфейсу додатка (українська/англійська мови) з підтримкою збереження стану в локальному сховищі браузера (localStorage) та автоматичним визначенням системних налаштувань користувача.

2. ПОСТАВЛЕНІ ЗАВДАННЯ
2.1. Обов'язкова частина:
- Створити файл ThemeContext.jsx, який містить об'єкт контексту, компонент-провайдер та кастомний хук useTheme.
- Підключити ThemeProvider у кореневому компоненті застосунку (App.jsx або main.jsx).
- Реалізувати кнопку перемикання теми в компоненті Header (шапка додатка).
- Застосувати тему щонайменше до трьох різних компонентів додатка (шапка, списки, картки тварин, форми тощо).
- Переконатися, що тема впливає на фонові кольори, колір тексту та акцентні елементи.

2.2. Додаткові завдання:
- Зберегти вибір теми у localStorage для збереження стану після перезавантаження сторінки.
- Реалізувати плавний перехід між темами через CSS transitions.
- Додати другий контекст (SettingsContext) для зміни мови інтерфейсу (UA/EN).
- Реалізувати автоматичне визначення теми за замовчуванням на основі системних налаштувань ОС (prefers-color-scheme) та автовизначення мови браузера.

3. ХІД ВИКОНАННЯ РОБОТИ

3.1. Створення контексту теми оформлення
У файлі src/context/ThemeContext.jsx було реалізовано логіку збереження теми, автоматичне зчитування системної теми користувача та ефект для синхронізації з кореневим тегом HTML через атрибут data-theme.

Код файлу ThemeContext.jsx:
```javascript
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Автовизначення системної теми
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('app-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

3.2. Створення контексту локалізації (SettingsContext)
У файлі src/context/SettingsContext.jsx створено словник перекладів для української (ua) та англійської (en) мов, функцію перекладу параметрів t() та допоміжні функції для адаптації тексту тварин (переклад виду та відмінювання віку).

Код файлу SettingsContext.jsx:
```javascript
import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext();

const translations = {
  ua: {
    logoTitle: "🐾 Галерея улюбленців",
    navHome: "Головна",
    navGallery: "Галерея",
    navAbout: "Про застосунок",
    likesCount: "❤️ Улюбленців: {count}",
    welcomeTitle: "Ласкаво просимо до Pet Gallery! 🐾",
    welcomeText: "Це ваш персональний простір для керування та перегляду улюблених тваринок. Тут ви можете знайти нових друзів або додати своїх власних.",
    whyBestTitle: "Чому ми найкращі?",
    whyBestItem1: "🐶 Величезна база пухнастиків",
    whyBestItem2: "🐰 Зручний пошук та фільтрація",
    whyBestItem3: "🦜 Спільнота власників з усього світу",
    footerRights: "© {year} Pet Gallery. Всі права захищені.",
    footerCreated: "Створено для лабораторної роботи з React.",
    toggleThemeDark: "Темна тема",
    toggleThemeLight: "Світла тема",
    langSwitch: "Змінити мову",
    filterAll: "Всі",
    filterLiked: "Улюблені",
    filterCats: "Коти",
    filterDogs: "Собаки",
    addFormTitle: "Додати нового улюбленця",
    formName: "Ім'я:",
    formNamePlaceholder: "Наприклад, Муркотик",
    formSpecies: "Вид:",
    formAge: "Вік (років):",
    formPhoto: "Посилання на фото (необов'язково):",
    formPhotoPlaceholder: "https://example.com/photo.jpg",
    formPhotoHint: "Якщо порожньо, буде використано фото за замовчуванням для обраного виду.",
    formSubmit: "Додати до галереї",
    cardDetailsBtn: "Детальніше",
    cardLikeTitleRemove: "Видалити з улюблених",
    cardLikeTitleAdd: "Додати в улюблені",
    detailsBack: "← Назад до галереї",
    detailsLikedBtn: "❤️ В улюблених",
    detailsLikeBtn: "🤍 Додати в улюблені",
    detailsNotFoundTitle: "Помилка 😢",
    detailsNotFoundText: "Улюбленця з ідентифікатором \"{id}\" не знайдено в нашій базі.",
    detailsBackToList: "Повернутися до списку",
    detailsSpecies: "Вид:",
    detailsAge: "Вік:",
    detailsAboutTitle: "Про улюбленця:",
    detailsDescriptionText: "Це детальна сторінка для {name}. Цей чудовий представник виду {species} шукає вашу увагу та любов! Знаходиться в системі під номером #{id}.",
    detailsToListBtn: "До списку",
    apiTitle: "Спільнота власників (із API)",
    apiLoading: "Завантаження даних із сервера... ⏳",
    apiError: "❌ Не вдалося завантажити дані: {error}",
    apiErrorHint: "Перевірте підключення до мережі або URL ендпоінту.",
    apiCity: "Місто:",
    apiEmail: "Email:",
    apiCompany: "Компанія:",
    speciesCat: "Кіт",
    speciesDog: "Собака",
    speciesParrot: "Папуга",
    speciesRabbit: "Кролик",
    aboutTitle: "Про застосунок Pet Gallery",
    aboutIntro: "Цей застосунок створено як фінальний проєкт в рамках курсу вивчення React.",
    aboutHeader: "🚀 Що реалізовано під капотом:",
    aboutItem1: "🧩 Компонентна архітектура: Побудова надійної ієрархії (Lifting State Up, передача Props).",
    aboutItem2: "⚛️ Хуки React: Керування станом та життєвим циклом через useState та useEffect.",
    aboutItem3: "💾 Local Storage: Надійна пам'ять прямо у вашому браузері — жоден улюбленець не зникне після F5!",
    aboutItem4: "🌐 Асинхронний Fetch API: Інтеграція із зовнішнім світом для витягування даних.",
    aboutItem5: "🗺️ React Router v6: Клієнтська маршрутизація, динамічні URL (/pet/:id), Layouts, та перенаправлення без перезавантаження браузера.",
    aboutVersion: "Версія застосунку: 1.0.0",
    aboutFooter: "Розроблено з турботою про пухнастиків 🐾"
  },
  en: {
    logoTitle: "🐾 Pet Gallery",
    navHome: "Home",
    navGallery: "Gallery",
    navAbout: "About App",
    likesCount: "❤️ Pets: {count}",
    welcomeTitle: "Welcome to Pet Gallery! 🐾",
    welcomeText: "This is your personal space to manage and view your favorite pets. Here you can find new friends or add your own.",
    whyBestTitle: "Why are we the best?",
    whyBestItem1: "🐶 Huge base of fluffies",
    whyBestItem2: "🐰 Convenient search and filtering",
    whyBestItem3: "🦜 Community of owners from around the world",
    footerRights: "© {year} Pet Gallery. All rights reserved.",
    footerCreated: "Created for React laboratory work.",
    toggleThemeDark: "Dark Theme",
    toggleThemeLight: "Light Theme",
    langSwitch: "Change Language",
    filterAll: "All",
    filterLiked: "Liked",
    filterCats: "Cats",
    filterDogs: "Dogs",
    addFormTitle: "Add New Pet",
    formName: "Name:",
    formNamePlaceholder: "For example, Fluffy",
    formSpecies: "Species:",
    formAge: "Age (years):",
    formPhoto: "Photo Link (optional):",
    formPhotoPlaceholder: "https://example.com/photo.jpg",
    formPhotoHint: "If empty, a default photo for the selected species will be used.",
    formSubmit: "Add to Gallery",
    cardDetailsBtn: "More Details",
    cardLikeTitleRemove: "Remove from favorites",
    cardLikeTitleAdd: "Add to favorites",
    detailsBack: "← Back to gallery",
    detailsLikedBtn: "❤️ Liked",
    detailsLikeBtn: "🤍 Add to favorites",
    detailsNotFoundTitle: "Error 😢",
    detailsNotFoundText: "Pet with ID \"{id}\" was not found in our database.",
    detailsBackToList: "Back to list",
    detailsSpecies: "Species:",
    detailsAge: "Age:",
    detailsAboutTitle: "About the pet:",
    detailsDescriptionText: "This is a detailed page for {name}. This wonderful representative of the {species} species is looking for your attention and love! ID in the system #{id}.",
    detailsToListBtn: "To list",
    apiTitle: "Community of Owners (from API)",
    apiLoading: "Loading data from server... ⏳",
    apiError: "❌ Failed to load data: {error}",
    apiErrorHint: "Check your network connection or the endpoint URL.",
    apiCity: "City:",
    apiEmail: "Email:",
    apiCompany: "Company:",
    speciesCat: "Cat",
    speciesDog: "Dog",
    speciesParrot: "Parrot",
    speciesRabbit: "Rabbit",
    aboutTitle: "About Pet Gallery App",
    aboutIntro: "This app was created as a final project for the React course.",
    aboutHeader: "🚀 What's under the hood:",
    aboutItem1: "🧩 Component Architecture: Building a reliable hierarchy (Lifting State Up, Props passing).",
    aboutItem2: "⚛️ React Hooks: Managing state and lifecycle via useState and useEffect.",
    aboutItem3: "💾 Local Storage: Reliable local storage in your browser — no pet is lost on refresh!",
    aboutItem4: "🌐 Asynchronous Fetch API: Integration with the outside world for fetching data.",
    aboutItem5: "🗺️ React Router v6: Client-side routing, dynamic URLs (/pet/:id), Layouts, and redirects without page reloading.",
    aboutVersion: "App version: 1.0.0",
    aboutFooter: "Developed with love for fluffy pets 🐾"
  }
};

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('app-language');
    if (savedLang === 'ua' || savedLang === 'en') {
      return savedLang;
    }
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.startsWith('uk')) {
      return 'ua';
    }
    return 'en';
  });

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ua' ? 'en' : 'ua'));
  };

  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  const t = (key, params = {}) => {
    let text = translations[language]?.[key] || translations['ua']?.[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const getSpeciesTranslation = (species) => {
    if (species === 'Кіт') return t('speciesCat');
    if (species === 'Собака') return t('speciesDog');
    if (species === 'Папуга') return t('speciesParrot');
    if (species === 'Кролик') return t('speciesRabbit');
    return species;
  };

  const getAgeText = (age) => {
    if (language === 'en') {
      return `${age} ${age === 1 ? 'year' : 'years'}`;
    }
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${age} років`;
    }
    if (lastDigit === 1) {
      return `${age} рік`;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${age} роки`;
    }
    return `${age} років`;
  };

  return (
    <SettingsContext.Provider value={{ language, toggleLanguage, t, getSpeciesTranslation, getAgeText }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
```

3.3. Підключення провайдерів у точці входу додатка
У файлі src/main.jsx додано імпорт ThemeProvider та SettingsProvider для огортання всього дерева компонентів:
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { SettingsProvider } from './context/SettingsContext'
import './styles/global.css'
import './styles/router-fixes.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SettingsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SettingsProvider>
    </ThemeProvider>
  </StrictMode>,
)
```

3.4. Оновлення компонентів інтерфейсу
- **src/components/Header.jsx**: Інтегровано хуки вибору теми та мови. Створено інтерфейсні елементи керування: кнопки перемикання теми (🌙/☀️) та зміни мови (EN/UA).
- **src/components/Footer.jsx**: Текстовий опис переведено на використання функції `t()`.
- **src/pages/Home.jsx** та **src/pages/About.jsx**: Замінено всі жорстко прописані українські тексти на динамічні ключі перекладу.
- **src/pages/PetList.jsx**: Локалізовано назви фільтрів видів тварин.
- **src/components/PetCard.jsx** та **src/pages/PetDetails.jsx**: Додано локалізовані хелпери для назв видів та відмінювання років життя. Повністю локалізовано динамічний опис тварини.
- **src/components/AddPetForm.jsx**: Локалізовано всі текстові позначення (labels), плейсхолдери та підказки форми додавання.
- **src/components/PetOwnersAPI.jsx**: Додано локалізацію станів завантаження даних, помилок та підписів інформації про власників тварин.

3.5. Стилізація темної теми та плавні переходи
У файлі src/styles/global.css додано визначення змінних для темного режиму та налаштовано час переходу для елементів інтерфейсу:
```css
[data-theme='dark'] {
  --bg-color: #121212;
  --text-color: #e0e0e0;
  --card-bg: #1e1e1e;
  --text-light: #a0a0a0;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  --shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.7);
  --border-color: #333333;
}

body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.pet-card, .add-pet-form, .owner-card, .details-card, .api-state, .app-footer, .app-header {
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s, box-shadow 0.2s;
}
```
Також додано відповідні перевизначення для елементів вибору форми (`select`), полів вводу (`input`) та кнопок фільтрації у файлі src/styles/router-fixes.css, щоб вони відповідали темному фону.

4. РЕЗУЛЬТАТИ ВИКОНАННЯ ТА ТЕСТУВАННЯ
Тестування працездатності коду проводилось шляхом локальної збірки додатка за допомогою команди:
`npm run build`

Результат компіляції:
```text
vite v8.0.3 building client environment for production...
transforming...✓ 39 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.45 kB │ gzip:  0.29 kB
dist/assets/index-CQ5byXEH.css    9.49 kB │ gzip:  2.20 kB
dist/assets/index-gcrUiJxJ.js   254.92 kB │ gzip: 81.10 kB

✓ built in 201ms
```
Збірка завершилась без помилок. Під час тестування інтерфейсу підтверджено:
1. Зміна теми відбувається плавно та застосовується до всього дерева елементів.
2. При виборі англійської мови всі текстові елементи оновлюються миттєво.
3. Локальне сховище (localStorage) надійно зберігає стан теми (`app-theme`) та мови (`app-language`) після оновлення сторінки в браузері.
4. При першому відвідуванні додатка автоматично визначається системна тема та мова за замовчуванням.

5. ВИСНОВКИ
Під час виконання практичного завдання було успішно розроблено та інтегровано механізми глобального стану через React Context API. Застосування контексту дозволило уникнути передачі параметрів крізь проміжні рівні дерева компонентів (prop drilling) для таких наскрізних функцій як зміна мови та теми оформлення. Додаток тепер має адаптивну стилізацію та підтримує двомовність, що відповідає сучасним стандартам розробки інтерфейсів.
