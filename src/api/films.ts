import type { Film } from "@/types/film.types";

export async function fetchFilms(): Promise<Film[]> {
  const response = await fetch('films.json');

// ošetření chyb při načítání dat
  if (!response.ok) {
    throw new Error(`Chyba při načítání filmů: ${response.statusText}`);
  }
  
  return response.json();

}