import { useState, useEffect } from "react";

export interface Film {
  title: string;
  year: number;
  genre: string;
  rating: number;
  watched: boolean;
}

// vlastní hook - přijímá počáteční filmy a vrací logiku
export function useWatchlist(initialFilms: Film[]) {

const [films, setFilms] = useState(initialFilms);

// přepnutí stavu jednoho filmu podle názvu
const toggleWatched = (title: string) => {
  setFilms(prev => prev.map(f => f.title === title ? { ...f, watched: !f.watched } : f));
};

// označení všech filmů jako zhlédnuté
const markAllAsWatched = () => {
  setFilms(prev => prev.map(f => ({ ...f, watched: true })));
};

// sledování změn ve watchlistu a aktualizace title stránky
useEffect (() => {
  const watchedCount = films.filter(f => f.watched).length;
  document.title = `Watchlist - (${watchedCount}/${films.length} zhlédnuto)`;}, [films]);

  // vrácení dat pro komponentu App
return { films, toggleWatched, markAllAsWatched };
}