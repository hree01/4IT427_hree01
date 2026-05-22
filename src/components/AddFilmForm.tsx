import React, { useState } from 'react';
import { useWatchlist } from '@/context/WatchlistContext';
export default function AddFilmForm() {
  const { addFilm } = useWatchlist();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // validace vstupů
    if (!title || !year || !genre || !rating) {
      return;
    }
    addFilm({ 
      title,
      year: Number(year), 
      genre, 
      rating: Number(rating) });
    // vymazání políček po přidání filmu
    setTitle('');
    setYear('');
    setGenre('');
    setRating('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Název filmu"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Rok vydání"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Žánr"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Hodnocení"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
        min={1}
        max={10}
      />
      <button type="submit">Přidat film</button>
    </form>
  );
}