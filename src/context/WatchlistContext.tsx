import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Film } from '@/types/film.types';

interface WatchlistContextValue {
  films: Film[];
  addFilm: (film: Omit<Film, 'id' | 'watched'>) => void;
  removeFilm: (id: string) => void;
  toggleWatched: (title: string) => void;
  markAllAsWatched: () => void;
}
// vytvoření kontextu pro watchlist
const WatchlistContext = createContext<WatchlistContextValue | null>(null);

const initialFilms: Film[] = [
  {
    id: "1",
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    watched: false,
  },
  {
    id: "2",
    title: "The Matrix",
    year: 1999,
    genre: "Action",
    rating: 8.7,
    watched: true,
  },
  {
    id: "3",
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 10,
    watched: false,
  },
];

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [films, setFilms] = useState<Film[]>(initialFilms);
  // přidání filmu do watchlistu
  const addFilm = (newFilm: Omit<Film, 'id' | 'watched'>) => {
    const filmWithId: Film = { ...newFilm, id: Date.now().toString(), watched: false };
    setFilms(prev => [...prev, filmWithId]);
  };
  // odstranění filmu z watchlistu podle id
  const removeFilm = (id: string) => {
    setFilms(prev => prev.filter(f => f.id !== id));
  };

  // přepnutí stavu jednoho filmu podle id
  const toggleWatched = (id: string) => {
    setFilms(prev => prev.map(f => f.id === id ? { ...f, watched: !f.watched } : f));
  };

  // označení všech filmů jako zhlédnuté
  const markAllAsWatched = () => {
    setFilms(prev => prev.map(f => ({ ...f, watched: true })));
  };

  // sledování změn ve watchlistu a aktualizace title stránky
  useEffect(() => {
    const watchedCount = films.filter(f => f.watched).length;
    document.title = `Watchlist - (${watchedCount}/${films.length} zhlédnuto)`;
  }, [films]);

  return (
    <WatchlistContext.Provider value={{ films, addFilm, removeFilm, toggleWatched, markAllAsWatched }}>
      {children}
    </WatchlistContext.Provider>
  );
};

// vlastní hook - přijímá počáteční filmy a vrací logiku
export const useWatchlist = () => {

  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist musí být použit uvnitř WatchlistProvideru");
  }

  return context;

}