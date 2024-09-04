import { useQuery } from '@apollo/client';
import { GET_CHARACTER_DETAILS } from '@/queries/characters';

const CharacterDetail = ({ id }: { id: string }) => {
    const { data, loading, error } = useQuery(GET_CHARACTER_DETAILS, {
        variables: { id },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const character = data.character;

    return (
        <div>
            <h1>{character.name}</h1>

        </div>
    );
};

export default CharacterDetail;
