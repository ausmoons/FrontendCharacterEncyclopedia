import { useQuery } from '@apollo/client';
import { GET_CHARACTER_DETAILS } from '@queries/characters';
import { CharacterDetailsData } from '@/types/character';

export const useCharacterDetails = (id: string | string[] | undefined) => {
  const { loading, error, data } = useQuery<CharacterDetailsData>(
    GET_CHARACTER_DETAILS,
    {
      variables: { id },
      skip: !id,
    }
  );

  return { loading, error, person: data?.person };
};
