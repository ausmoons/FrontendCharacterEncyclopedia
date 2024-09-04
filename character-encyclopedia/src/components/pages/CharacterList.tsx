// pages/characters.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../queries/characters';
import Link from 'next/link';

const CharactersPage: React.FC = () => {
    const { data, loading, error } = useQuery(GET_CHARACTERS);

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) {
        console.error("Error fetching characters:", error);
        return <div className="text-center py-8">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Star Wars Characters</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.allPeople.people.map((character: any) => {
                    // Create a detailed description for each character
                    const speciesNames = character.species && Array.isArray(character.species)
                        ? character.species.map((spec: any) => spec.name).join(', ')
                        : 'unknown species';

                    const description = `${character.name} is a ${character.gender || 'unknown gender'} ${speciesNames}. 
                    They were born in ${character.birthYear || 'unknown year'}, have ${character.eyeColor || 'unknown eye color'}, 
                    ${character.hairColor || 'unknown hair color'}, and a height of ${character.height || 'unknown height'} cm.`;

                    return (
                        <Link href={`/characters/${character.id}`} key={character.id}>
                            <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out p-4 cursor-pointer">
                                <h2 className="text-xl font-bold text-white">{character.name}</h2>
                                <p className="text-gray-300 line-clamp-3">{description}</p>
                                <div className="mt-4">
                                    <span className="inline-block bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CharactersPage;