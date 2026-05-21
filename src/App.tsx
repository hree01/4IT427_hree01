import FilmCard from '@/components/FilmCard';
//import { useState } from 'react';
import { useWatchlist } from '@/hooks/useWatchlist';
import type { Film } from '@/hooks/useWatchlist';

const initialFilms: Film[] = [
  {
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    watched: false,
  },
  {
    title: "The Matrix",
    year: 1999,
    genre: "Action",
    rating: 8.7,
    watched: true,
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 10,
    watched: false,
  },
];
function App() {

const {films, toggleWatched, markAllAsWatched} = useWatchlist(initialFilms);
  return (
    <>
    <button onClick={markAllAsWatched}>Označit vše jako zhlédnuté</button>
    {films.map((film) => (
      <><FilmCard
        key={film.title}
        title={film.title}
        year={film.year}
        genre={film.genre}
        rating={film.rating}
        watched={film.watched}
        onToggleWatched={toggleWatched} /></>
    ))
  }
    </>
  )
}

export default App
