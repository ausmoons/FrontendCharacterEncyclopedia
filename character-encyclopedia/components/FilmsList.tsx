import React from 'react';
import { Film } from '@/types/character';
import { GiFilmSpool } from 'react-icons/gi';
import styles from '@styles/components/FilmList.module.scss';

interface FilmsListProps {
  films: Film[];
}

export const FilmsList: React.FC<FilmsListProps> = React.memo(({ films }) => (
  <div className={styles.filmsList}>
    <h2 className={styles.filmsTitle}>Films</h2>
    {films.length > 0 ? (
      <ul className={styles.filmItem}>
        {films.map((film, index) => (
          <li key={index}>
            <GiFilmSpool className={styles.filmIcon} aria-hidden="true" />
            <span>{film.node?.title || 'Unknown Film'}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className={styles.infoText}>No films found for this character.</p>
    )}
  </div>
));

FilmsList.displayName = 'FilmsList';
