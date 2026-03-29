import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// Додаткове завдання: Layout-компонент (спільна структура)
const Layout = ({ totalLikes }) => {
  return (
    <>
      <Header totalLikes={totalLikes} />
      <main className="app-main">
        {/* Сюди рендеряться вкладені маршрути (Home, PetList, About, тощо) */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
