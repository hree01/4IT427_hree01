/* Stylingová metoda: CSS Modules */
import AddFilmForm from '@/components/AddFilmForm';
import styles from '../App.module.css';

export default function AddFilmPage() {
  return (
    <div>
        <h2 className={styles.stats} >
        Přidat nový film do seznamu
      </h2>
    <AddFilmForm />
    </div>
  );
}