import type { Film } from '../types/film.types';

// filtorvání filmů podle názvu (case-insensitive, ignoruje počáteční/koncové mezery)
export function filterFilmsByTitle(films: Film[], searchTerm: string): Film[] {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return films;
  }

  return films.filter((film) => film.title.toLowerCase().includes(normalizedSearch));
}

// výpočet průměrného hodnocení z předaného pole filmů
// pokud je pole prázdné, vrátí 0
export function calculateAverageRating(films: Film[]): number {
  if (films.length === 0) {
    return 0;
  }

  const totalRating = films.reduce((sum, film) => sum + film.rating, 0);
  return totalRating / films.length;
}
