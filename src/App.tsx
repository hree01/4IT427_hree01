/* Stylingová metoda: CSS Modules */
import React, { useState } from 'react';
/* import FilmCard from '@/components/FilmCard';
import AddFilmForm from '@/components/AddFilmForm'; */
import styles from './App.module.css';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import WatchlistPage from '@/pages/WatchlistPage';
import AddFilmPage from '@/pages/AddFilmPage';



function App() {
  // Stav pro hlídání tmavého režimu
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  // Funkce pro přepnutí tmavého/světlého režimu
  const handleToggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDarkMode(html.classList.contains('dark'));
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
      {/* Společná navigace pro celou aplikaci */}
      <nav className={styles.navbar}>
        <NavLink to="/" end className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
          Můj Watchlist
        </NavLink>
        <NavLink 
          to="/form" 
          className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
          Přidat film
        </NavLink>
      </nav>
      {/* Jednotné záhlaví s přepínačem motivu pro všechny stránky */}
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Film Watchlist</h1>
        </div>
        <div className={styles.controls}>
          <button 
            className={styles.btnToggleMode} 
            onClick={handleToggleDarkMode}
            title={isDarkMode ? "Přepnout na světlý motiv" : "Přepnout na tmavý motiv"}
          >
            {isDarkMode ? '☀️ Světlý režim' : '🌙 Tmavý režim'}
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<WatchlistPage />} />
          <Route path="/form" element={<AddFilmPage />} />
          {/* Fallback routa podle zadání: přesměruje neexistující adresy na / */}
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </div>
  )
}

export default App
