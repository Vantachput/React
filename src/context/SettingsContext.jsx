import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Створення об'єкта контексту
const SettingsContext = createContext();

// 2. Словник перекладів для локалізації
const translations = {
  ua: {
    // Навігація / Шапка
    logoTitle: "🐾 Галерея улюбленців",
    navHome: "Головна",
    navGallery: "Галерея",
    navAbout: "Про застосунок",
    likesCount: "❤️ Улюбленців: {count}",
    
    // Головна сторінка
    welcomeTitle: "Ласкаво просимо до Pet Gallery! 🐾",
    welcomeText: "Це ваш персональний простір для керування та перегляду улюблених тваринок. Тут ви можете знайти нових друзів або додати своїх власних.",
    whyBestTitle: "Чому ми найкращі?",
    whyBestItem1: "🐶 Величезна база пухнастиків",
    whyBestItem2: "🐰 Зручний пошук та фільтрація",
    whyBestItem3: "🦜 Спільнота власників з усього світу",
    
    // Підвал
    footerRights: "© {year} Pet Gallery. Всі права захищені.",
    footerCreated: "Створено для лабораторної роботи з React.",
    
    // Перемикачі
    toggleThemeDark: "Темна тема",
    toggleThemeLight: "Світла тема",
    langSwitch: "Змінити мову",

    // Список улюбленців
    filterAll: "Всі",
    filterLiked: "Улюблені",
    filterCats: "Коти",
    filterDogs: "Собаки",
    galleryTitle: "Наші улюбленці",
    emptyTitle: "Тваринок не знайдено 😢",
    emptySubtitle: "Спробуйте змінити параметр фільтрації.",
    
    // Форма додавання
    addFormTitle: "Додати нового улюбленця",
    formName: "Ім'я:",
    formNamePlaceholder: "Наприклад, Муркотик",
    formSpecies: "Вид:",
    formAge: "Вік (років):",
    formPhoto: "Посилання на фото (необов'язково):",
    formPhotoPlaceholder: "https://example.com/photo.jpg",
    formPhotoHint: "Якщо порожньо, буде використано фото за замовчуванням для обраного виду.",
    formSubmit: "Додати до галереї",
    
    // Картка улюбленця
    cardDetailsBtn: "Детальніше",
    cardLikeTitleRemove: "Видалити з улюблених",
    cardLikeTitleAdd: "Додати в улюблені",
    
    // Деталі улюбленця
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
    
    // API розділ / Спільнота
    apiTitle: "Спільнота власників (із API)",
    apiLoading: "Завантаження даних із сервера... ⏳",
    apiError: "❌ Не вдалося завантажити дані: {error}",
    apiErrorHint: "Перевірте підключення до мережі або URL ендпоінту.",
    apiCity: "Місто:",
    apiEmail: "Email:",
    apiCompany: "Компанія:",

    // Види
    speciesCat: "Кіт",
    speciesDog: "Собака",
    speciesParrot: "Папуга",
    speciesRabbit: "Кролик",

    // Видалення
    delete: "Видалити",
    deleteConfirmTitle: "Видалити улюбленця? 🗑️",
    deleteConfirmText: "Ви впевнені, що хочете видалити {name} з галереї?",
    confirm: "Так, видалити",
    cancel: "Скасувати",

    // Про застосунок сторінка
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
    // Navigation / Header
    logoTitle: "🐾 Pet Gallery",
    navHome: "Home",
    navGallery: "Gallery",
    navAbout: "About App",
    likesCount: "❤️ Pets: {count}",
    
    // Home Page
    welcomeTitle: "Welcome to Pet Gallery! 🐾",
    welcomeText: "This is your personal space to manage and view your favorite pets. Here you can find new friends or add your own.",
    whyBestTitle: "Why are we the best?",
    whyBestItem1: "🐶 Huge base of fluffies",
    whyBestItem2: "🐰 Convenient search and filtering",
    whyBestItem3: "🦜 Community of owners from around the world",
    
    // Footer
    footerRights: "© {year} Pet Gallery. All rights reserved.",
    footerCreated: "Created for React laboratory work.",
    
    // Theme Switcher tooltips
    toggleThemeDark: "Dark Theme",
    toggleThemeLight: "Light Theme",
    langSwitch: "Change Language",

    // Pet List
    filterAll: "All",
    filterLiked: "Liked",
    filterCats: "Cats",
    filterDogs: "Dogs",
    galleryTitle: "Our Pets",
    emptyTitle: "No pets found 😢",
    emptySubtitle: "Try changing the filter parameters.",
    
    // Add Pet Form
    addFormTitle: "Add New Pet",
    formName: "Name:",
    formNamePlaceholder: "For example, Fluffy",
    formSpecies: "Species:",
    formAge: "Age (years):",
    formPhoto: "Photo Link (optional):",
    formPhotoPlaceholder: "https://example.com/photo.jpg",
    formPhotoHint: "If empty, a default photo for the selected species will be used.",
    formSubmit: "Add to Gallery",
    
    // Pet Card
    cardDetailsBtn: "More Details",
    cardLikeTitleRemove: "Remove from favorites",
    cardLikeTitleAdd: "Add to favorites",
    
    // Pet Details
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
    
    // API Section / PetOwnersAPI
    apiTitle: "Community of Owners (from API)",
    apiLoading: "Loading data from server... ⏳",
    apiError: "❌ Failed to load data: {error}",
    apiErrorHint: "Check your network connection or the endpoint URL.",
    apiCity: "City:",
    apiEmail: "Email:",
    apiCompany: "Company:",

    // Species
    speciesCat: "Cat",
    speciesDog: "Dog",
    speciesParrot: "Parrot",
    speciesRabbit: "Rabbit",

    // Deletion
    delete: "Delete",
    deleteConfirmTitle: "Delete pet? 🗑️",
    deleteConfirmText: "Are you sure you want to delete {name} from the gallery?",
    confirm: "Yes, delete",
    cancel: "Cancel",

    // About Page
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

// 3. Компонент-провайдер
export function SettingsProvider({ children }) {
  // Ініціалізація стану з перевіркою localStorage та автовизначенням мови браузера
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('app-language');
    if (savedLang === 'ua' || savedLang === 'en') {
      return savedLang;
    }
    // Автовизначення мови браузера
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

  // Функція перекладу
  const t = (key, params = {}) => {
    let text = translations[language]?.[key] || translations['ua']?.[key] || key;
    
    // Заміна параметрів, наприклад {count} або {year}
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Переклад виду тварини
  const getSpeciesTranslation = (species) => {
    if (species === 'Кіт') return t('speciesCat');
    if (species === 'Собака') return t('speciesDog');
    if (species === 'Папуга') return t('speciesParrot');
    if (species === 'Кролик') return t('speciesRabbit');
    return species;
  };

  // Локалізоване відмінювання віку
  const getAgeText = (age) => {
    if (language === 'en') {
      return `${age} ${age === 1 ? 'year' : 'years'}`;
    }
    // Правила українського відмінювання числівників
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

// 4. Кастомний хук для споживачів
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
