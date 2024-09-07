import { SortOrder } from '@hooks/useCharacterList';

export const filterAndSortCharacters = (
  characters: any[],
  searchTerm: string,
  sortOrder: SortOrder
) => {
  return characters
    .filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
};
