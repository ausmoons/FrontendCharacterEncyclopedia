import React from 'react';
import { CharacterInfoProps } from '@/interfaces/character';
import styles from '@styles/components/character/CharacterInfo.module.scss';

const CharacterInfo: React.FC<CharacterInfoProps> = ({ person }) => (
  <div className={styles.infoContainer} data-testid="character-info">
    <p className={styles.infoText} data-testid="birth-year-info">
      <span className={styles.infoLabel}>Birth Year:</span>
      <span data-testid="birth-year-value">{person.birthYear || 'Unknown'}</span>
    </p>
    <p className={styles.infoText} data-testid="species-info">
      <span className={styles.infoLabel}>Species:</span>
      <span data-testid="species-value">{person.species?.name || 'Unknown'}</span>
    </p>
    <p className={styles.infoText} data-testid="homeworld-info">
      <span className={styles.infoLabel}>Homeworld:</span>
      <span data-testid="homeworld-value">{person.homeworld?.name || 'Unknown'}</span>
    </p>
  </div>
);

CharacterInfo.displayName = 'CharacterInfo';

export default React.memo(CharacterInfo);