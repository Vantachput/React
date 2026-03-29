import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p>© {currentYear} Pet Gallery. Всі права захищені.</p>
      <p>Створено для лабораторної роботи з React.</p>
    </footer>
  );
};

export default Footer;
