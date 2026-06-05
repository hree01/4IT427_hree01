import { describe, it, expect } from 'vitest';
import { filterFilmsByTitle, calculateAverageRating } from './film.Utils';
import type { Film } from '../types/film.types';

// mock data pro testy
const mockFilms: Film[] = [
  { id: '1', title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 9, watched: true },
  { id: '2', title: 'The Dark Knight', year: 2008, genre: 'Action', rating: 10, watched: true },
  { id: '3', title: 'Interstellar', year: 2014, genre: 'Sci-Fi', rating: 8, watched: false },
];

describe('filmUtils', () => {
  describe('filterFilmsByTitle', () => {
    // Happy path
    it('should find films by a partial title match', () => {
      const result = filterFilmsByTitle(mockFilms, 'Dark');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Dark Knight');
    });

    // Edge case: Velká/malá písmena a mezery
    it('should be case-insensitive and trim whitespace', () => {
      const result = filterFilmsByTitle(mockFilms, '  interStellar   ');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Interstellar');
    });

    // Edge case: Prázdný vyhledávací text
    it('should return all films if search term is empty or only whitespace', () => {
      const result = filterFilmsByTitle(mockFilms, '   ');
      expect(result).toHaveLength(3);
    });
  });

  describe('calculateAverageRating', () => {
    // Happy path
    it('should calculate the correct average rating from given films', () => {
      const result = calculateAverageRating(mockFilms);
      // (9 + 10 + 8) / 3 = 9
      expect(result).toBe(9);
    });

    // Edge case: Prázdné pole
    it('should return 0 if the films array is empty', () => {
      const result = calculateAverageRating([]);
      expect(result).toBe(0);
    });
  });
});
