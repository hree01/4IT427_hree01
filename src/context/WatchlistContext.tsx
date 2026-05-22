import { createContext, useContext, useState, useEffect, ReactNode} from "react";
import type { Film } from '@/types/film.types';
import { useQuery } from "@tanstack/react-query";
import { fetchFilms } from "@/api/films";

interface WatchlistContextValue {
  films: Film[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  addFilm: (film: Omit<Film, 'id' | 'watched'>) => void;
  removeFilm: (id: string) => void;
  toggleWatched: (id: string) => void;
  markAllAsWatched: () => void;
}
// vytvoření kontextu pro watchlist
const WatchlistContext = createContext<WatchlistContextValue | null>(null);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [films, setFilms] = useState<Film[]>([]);
  // Volání TanStack Query hooku `useQuery`
  const { data: serverFilms, isLoading, isError, refetch } = useQuery<Film[]>({
    queryKey: ['films'],
    queryFn: fetchFilms,
  });

  useEffect(() => {
    if (serverFilms) {
      setFilms(serverFilms);
    }
  }, [serverFilms]);

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
    <WatchlistContext.Provider value={{ films, isLoading, isError, refetch, addFilm, removeFilm, toggleWatched, markAllAsWatched }}>
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