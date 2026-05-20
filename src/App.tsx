import FilmCard from '@/components/FilmCard';
const films = [
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
];
function App() {
  return (
    <>
    {films.map((film) => (
      <FilmCard
        title={film.title}
        year={film.year}
        genre={film.genre}
        rating={film.rating}
        watched={film.watched}
        onToggleWatched={() => {}}
      />
    ))
  }
    </>
  )
}

export default App
