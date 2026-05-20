interface FilmCardProps {
    title: string;
    year: number;
    genre: string;
    rating: number;
    watched: boolean;
    onToggleWatched: (title: string) => void;
}

function FilmCard({
  title,
  year,
  genre,
  rating,
  watched,
  onToggleWatched,
}: FilmCardProps) {
    const isRatingValid = rating >= 1 && rating <= 10;

    // handler pro změnu stavu zhlédnutí
    const handleButtonClick = () => {
    console.log(`Kliknuto na tlačítko filmu: ${title}`);
    onToggleWatched(title); 
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>Year: {year}</p>
      <p>Genre: {genre}</p>
      {isRatingValid ? (<p>Rating: {rating}/10</p>
      ) : (<p style={{ color: 'red' }}>Neplatné hodnocení: platné hodnoty 1-10</p>)}
      {watched && <p>✓ Zhlédnuto</p>}
      <button onClick={handleButtonClick}>
        Změnit stav zhlédnutí
      </button>
    </div>
  );
}

export default FilmCard;