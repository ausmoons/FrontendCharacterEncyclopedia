import React from 'react';
import { CharacterInfoProps } from '@/interfaces/character';
import styles from '@styles/components/character/CharacterInfo.module.scss';

const CharacterInfo: React.FC<CharacterInfoProps> = ({ person }) => (
  <div className={styles.infoContainer}>
    <p className={styles.infoText}>
      <span className={styles.infoLabel}>Birth Year:</span>
      <span>{person.birthYear || 'Unknown'}</span>
    </p>
    <p className={styles.infoText}>
      <span className={styles.infoLabel}>Species:</span>
      <span>{person.species?.name || 'Unknown'}</span>
    </p>
    <p className={styles.infoText}>
      <span className={styles.infoLabel}>Homeworld:</span>
      <span>{person.homeworld?.name || 'Unknown'}</span>
    </p>
  </div>
);

CharacterInfo.displayName = 'CharacterInfo';

export default React.memo(CharacterInfo);
