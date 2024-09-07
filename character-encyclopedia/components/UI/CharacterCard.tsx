import React from 'react';
import Link from 'next/link';

interface CharacterCardProps {
  character: {
    id: string;
    name: string;
    gender: string;
    species: { name: string }[];
    birthYear: string;
    eyeColor: string;
    hairColor: string;
    height: number;
  };
}

const CharacterCard: React.FC<CharacterCardProps> = React.memo(
  ({ character }) => {
    const speciesNames =
      character.species && Array.isArray(character.species)
        ? character.species.map((spec: any) => spec.name).join(', ')
        : 'unknown species';

    const description = `${character.name} is a ${character.gender || 'unknown gender'} ${speciesNames}.
    They were born in ${character.birthYear || 'unknown year'}, have ${character.eyeColor || 'unknown eye color'},
    ${character.hairColor || 'unknown hair color'}, and a height of ${character.height || 'unknown height'} cm.`;

    return (
      <div className="bg-gray-800 rounded-lg shadow-md transition duration-300 ease-in-out p-4">
        <h2 className="text-xl font-bold text-white">{character.name}</h2>
        <p className="text-gray-300 line-clamp-3">{description}</p>
        <div className="mt-4">
          <Link href={`/characters/${character.id}`}>
            <span className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded transition duration-300">
              View Details
            </span>
          </Link>
        </div>
      </div>
    );
  }
);

CharacterCard.displayName = 'CharacterCard';

export default CharacterCard;
