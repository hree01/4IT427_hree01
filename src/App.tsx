import FilmCard from '@/components/FilmCard';
// import React from 'react';
import { useWatchlist } from '@/context/WatchlistContext';
import AddFilmForm from './components/AddFilmForm';


function App() {

const {films, toggleWatched, removeFilm, markAllAsWatched} = useWatchlist();
const watchedCount = films.filter(f => f.watched).length;
const totalCount = films.length;
  return (
    <div>
      <header>
        <h1>Můj Watchlist</h1>
        <p>{watchedCount}/{totalCount} zhlédnuto</p>
      </header>
      <AddFilmForm />
    <button onClick={markAllAsWatched}>Označit vše jako zhlédnuté</button>
    <div>
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
