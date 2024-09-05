import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../queries/characters';
import Link from 'next/link';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import CharacterCard from '../UI/CharacterCard';

const CharacterList: React.FC = () => {
    const { data, loading, error } = useQuery(GET_CHARACTERS);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-6 text-center">All Characters</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.allPeople.people.map((character: any) => (
                    <Link href={`/characters/${character.id}`} key={character.id}>
                        <CharacterCard character={character} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default React.memo(CharacterList);