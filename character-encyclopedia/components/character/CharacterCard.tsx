import React from 'react';
import LinkButton from '@components/ui/LinkButton';
import styles from '@styles/components/character/CharacterCard.module.scss';
import { CharacterCardProps, Species } from '@/types/character';

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const speciesNames =
    character.species && Array.isArray(character.species)
      ? character.species.map((spec: Species) => spec.name).join(', ')
      : 'unknown species';

  const description = `${character.name} is a ${character.gender || 'unknown gender'} ${speciesNames}.
  They were born in ${character.birthYear || 'unknown year'}, have ${character.eyeColor || 'unknown eye color'},
  ${character.hairColor || 'unknown hair color'}, and a height of ${character.height ?? 'unknown height'} cm.`;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{character.name}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.buttonWrapper}>
        <LinkButton href={`/characters/${character.id}`} variant="button">
          View Details
        </LinkButton>
      </div>
    </div>
  );
};

CharacterCard.displayName = 'CharacterCard';

export default React.memo(CharacterCard);
