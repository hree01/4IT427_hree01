/* Stylingová metoda: CSS Modules */
import FilmCard from '@/components/FilmCard';
import { useWatchlist } from '@/context/WatchlistContext';
import styles from '../App.module.css';

export default function WatchlistPage() {

const {films, toggleWatched, removeFilm, markAllAsWatched} = useWatchlist();
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