import FilmCard from '@/components/FilmCard';
import { useState } from 'react';

interface Film {
  title: string;
  year: number;
  genre: string;
  rating: number;
  watched: boolean;
}

function App() {
  const [films, setFilms] = useState<Film[]>([
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
    rating: 10, // Neplatné hodnocení
    watched: false,
  },
]);

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
        onToggleWatched={() => { } } /></>
    ))
  }
    </>
  )
}

export default App
