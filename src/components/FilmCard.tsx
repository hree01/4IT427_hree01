interface FilmCardProps {
    id: string;
    title: string;
    year: number;
    genre: string;
    rating: number;
    watched: boolean;
    onToggleWatched: (id: string) => void;
    onRemove: (id: string) => void;
}

export default function FilmCard({
  id,
  title,
  year,
  genre,
  rating,
  watched,
  onToggleWatched,
  onRemove
}: FilmCardProps) {
    const isRatingValid = rating >= 1 && rating <= 10;

    // handler pro změnu stavu zhlédnutí
    const handleButtonClick = () => {
    console.log(`Kliknuto na tlačítko filmu: ${title}`);
    onToggleWatched(id); 
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>ID: {id}</p>
      <p>Year: {year}</p>
      <p>Genre: {genre}</p>
      {isRatingValid ? (<p>Rating: {rating}/10</p>
      ) : (<p style={{ color: 'red' }}>Neplatné hodnocení: platné hodnoty 1-10</p>)}
      <label>
        <input type="checkbox" checked={watched} onChange={() => onToggleWatched(id)} />
        ✓ Zhlédnuto
      </label>
      <button onClick={handleButtonClick}>
        Změnit stav zhlédnutí
      </button>
      <button onClick={() => onRemove(id)}>
        Odstranit film
      </button>
    </div>
  );
}