import React from 'react';
import LinkButton from '@components/ui/LinkButton';
import styles from '@styles/components/character/CharacterCard.module.scss';
import { CharacterCardProps, Species } from '@/types/character';

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const speciesNames =
    character.species && Array.isArray(character.species)
      ? character.species.map((spec: Species) => spec.name).join(', ')
      : 'unknown species';

  const description = `${character.name} is a ${character.gender || 'unknown gender'} ${speciesNames}. ` +
    `They were born in ${character.birthYear || 'an unknown year'}. ` +
    `${character.name} has ${character.eyeColor || 'unknown colored'} eyes and ${character.hairColor || 'unknown colored'} hair. ` +
    `They stand at a height of ${character.height ? `${character.height} cm` : 'an unknown height'}.`;

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{character.name}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.buttonWrapper}>
        <LinkButton
          href={`/characters/${character.id}`}
          variant="button"
          className={styles.linkButton}
        >
          View Details
        </LinkButton>
      </div>
    </div>
  );
};

CharacterCard.displayName = 'CharacterCard';

export default React.memo(CharacterCard);
