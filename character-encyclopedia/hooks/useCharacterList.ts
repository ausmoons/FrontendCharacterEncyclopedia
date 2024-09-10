import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '@queries/characters';
import { filterAndSortCharacters } from '@utils/characterUtils';
import { SortOrder } from '@/types/order';
import { Character } from '@/interfaces/character';

const useCharacterList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { first: 20 },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data?.allPeople?.edges) {
      const characters = data.allPeople.edges.map((edge: any) => edge.node);
      setFilteredCharacters(
        filterAndSortCharacters(characters, searchTerm, sortOrder)
      );
    }
  }, [data, searchTerm, sortOrder]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleLoadMore = () => {
    if (data?.allPeople?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: data.allPeople.pageInfo.endCursor,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return {
            allPeople: {
              ...fetchMoreResult.allPeople,
              edges: [
                ...prevResult.allPeople.edges,
                ...fetchMoreResult.allPeople.edges,
              ],
            },
          };
        },
      });
    }
  };

  return {
    filteredCharacters,
    loading,
    error,
    searchTerm,
    sortOrder,
    handleSearch,
    handleSortToggle,
    handleLoadMore,
    hasNextPage: data?.allPeople?.pageInfo?.hasNextPage,
  };
};

export default useCharacterList;