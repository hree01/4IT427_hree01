/* Stylingová metoda: CSS Modules */
import FilmCard from '@/components/FilmCard';
import { useWatchlist } from '@/context/WatchlistContext';
import styles from '../App.module.css';

export default function WatchlistPage() {

const {films, isLoading, isError, refetch, toggleWatched, removeFilm, markAllAsWatched} = useWatchlist();

// Zobrazit načítací stav
if (isLoading) {
  return <div>Načítání...</div>;
}
// Zobrazit chybový stav
if (isError) {
  return (
      <div style={{ textAlign: 'center', padding: '40px', border: '1px dashed var(--danger-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
        <p style={{ color: 'var(--danger-color)', fontWeight: 600, marginBottom: '15px' }}>
          Ups! Nepodařilo se načíst seznam filmů.
        </p>
        {/* Tlačítko zavolá refetch z TanStack Query a zkusí data stáhnout znovu */}
        <button className={styles.btnAction} onClick={refetch} style={{ backgroundColor: 'var(--danger-color)' }}>
          Zkusit znovu
        </button>
      </div>
    );
}

const watchedCount = films.filter(f => f.watched).length;
const totalCount = films.length;
  return (
    <div>
    <div>
        <h2 className={styles.stats} >
          {watchedCount} / {totalCount} zhlédnuto
        </h2>
        <button className={styles.btnAction} onClick={markAllAsWatched}>
          Označit vše jako zhlédnuté
        </button>
    </div>
    {/* Pokud by byl watchlist úplně prázdný */}
      {films.length === 0 && (
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>
          Tvůj watchlist je prázdný. Přidej nějaký film!
        </p>
      )}
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
    
  );
}