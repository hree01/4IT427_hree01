import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FilmCard from './FilmCard';

describe('FilmCard Component', () => {
  const mockProps = {
    id: 'film-123',
    title: 'Pulp Fiction',
    year: 1994,
    genre: 'Crime',
    rating: 9,
    onToggleWatched: vi.fn(),
    onRemove: vi.fn(),
  };

  it('should correctly render film title and year', () => {
    render(<FilmCard {...mockProps} watched={false} />);

    expect(screen.getByText('Pulp Fiction')).toBeInTheDocument();
    expect(screen.getByText('Year: 1994')).toBeInTheDocument();
  });

  it('should have checked checkbox when watched is true', () => {
    render(<FilmCard {...mockProps} watched={true} />);

    const checkbox = screen.getByLabelText('Zhlédnuto');
    expect(checkbox).toBeChecked();
  });

  it('should have unchecked checkbox when watched is false', () => {
    render(<FilmCard {...mockProps} watched={false} />);

    const checkbox = screen.getByLabelText('Zhlédnuto');
    expect(checkbox).not.toBeChecked();
  });

  it('should call onToggleWatched callback when the toggle button is clicked', async () => {
    const onToggleWatchedMock = vi.fn();

    render(<FilmCard {...mockProps} watched={false} onToggleWatched={onToggleWatchedMock} />);

    const button = screen.getByRole('button', { name: 'Změnit stav zhlédnutí' });

    // Simulace reálného kliknutí uživatele
    await userEvent.click(button);

    // Ověření, že se callback zavolal přesně jednou se správným ID
    expect(onToggleWatchedMock).toHaveBeenCalledTimes(1);
    expect(onToggleWatchedMock).toHaveBeenCalledWith('film-123');
  });
});
