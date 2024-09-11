import { useQuery } from '@apollo/client';
import { GET_CHARACTER_DETAILS } from '@queries/characters';
import { CharacterInfoProps } from '@/interfaces/character';

export const useCharacterDetails = (id: string | null) => {
  const { loading, error, data } = useQuery<CharacterInfoProps>(
    GET_CHARACTER_DETAILS,
    {
      variables: { id },
      skip: !id,
    }
  );

  return { loading, error, person: data?.person };
};
