/* Stylingová metoda: CSS Modules */
import React, { useState, useEffect } from 'react';
import FilmCard from '@/components/FilmCard';
import AddFilmForm from '@/components/AddFilmForm';
import { useWatchlist } from '@/context/WatchlistContext';
import styles from './App.module.css';


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

const {films, toggleWatched, removeFilm, markAllAsWatched} = useWatchlist();
const watchedCount = films.filter(f => f.watched).length;
const totalCount = films.length;
  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Můj Watchlist</h1>
          <p className={styles.stats}>{watchedCount}/{totalCount} zhlédnuto</p>
        </div>
        <div className={styles.controls}>
          <button className={styles.btnToggleMode} onClick={handleToggleDarkMode}title={isDarkMode ? "Přepnout na světlý motiv" : "Přepnout na tmavý motiv"}
          >
            {isDarkMode ? '☀️ Světlý režim' : '🌙 Tmavý režim'}
          </button>
        </div>
      </header>
      <AddFilmForm />
    <button className={styles.btnAction} onClick={markAllAsWatched}>
      Označit vše jako zhlédnuté
    </button>
    {/* Responzivní mřížka s kartami */}
    <div className={styles.filmGrid}>
    {films.map((film) => (
      <FilmCard
        key={film.id}
        id={film.id}
        title={film.title}
        year={film.year}
        genre={film.genre}
        rating={film.rating}
        watched={film.watched}
        onToggleWatched={toggleWatched}
        onRemove={removeFilm} />
    ))
  }
    </div>
    </div>
  )
}

export default App
