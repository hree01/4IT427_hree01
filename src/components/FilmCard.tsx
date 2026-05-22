import styles from './FilmCard.module.css';

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

    // Sestavení tříd pro kartu - pokud je zhlédnutý, přidáme speciální třídu
  const cardClass = `${styles.card} ${watched ? styles.cardWatched : ''}`;

    // handler pro změnu stavu zhlédnutí
    const handleButtonClick = () => {
    console.log(`Kliknuto na tlačítko filmu: ${title}`);
    onToggleWatched(id); 
  };

  return (
    <div className={cardClass}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.meta}>ID: {id}</p>
      <p className={styles.meta}>Year: {year}</p>
      <p className={styles.meta}>Genre: {genre}</p>
      {isRatingValid ? (
        <p className={styles.rating}>Rating: {rating}/10</p>
      ) : (
        <p className={styles.meta} style={{ color: 'red' }}>
          Neplatné hodnocení: platné hodnoty 1-10
        </p>
      )}
      <div className={styles.actions}>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" checked={watched} onChange={() => onToggleWatched(id)} />
        Zhlédnuto
      </label>
      <button onClick={handleButtonClick} className={styles.btnToggle}>
        Změnit stav zhlédnutí
      </button>
      <button onClick={() => onRemove(id)} className={styles.btnRemove}>
        Odstranit film
      </button>
    </div>
    </div>
  );
}