import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../queries/characters';
import Link from 'next/link';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import CharacterCard from '../UI/CharacterCard';
import SearchBar from '../UI/SearchBar';

type SortOrder = 'asc' | 'desc';

const CharacterList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { first: 20 },
    notifyOnNetworkStatusChange: true,
  });

  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);

  useEffect(() => {
    if (data?.allPeople?.edges) {
      let characters = data.allPeople.edges.map((edge: any) => edge.node);
      characters = characters.filter((character: any) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      characters.sort((a: any, b: any) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      setFilteredCharacters(characters);
    }
  }, [data, searchTerm, sortOrder]);

  if (loading && !data) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleLoadMore = () => {
    if (data.allPeople.pageInfo.hasNextPage) {
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">All Characters</h1>
      <div className="flex justify-between items-center mb-6">
        <SearchBar onSearch={handleSearch} />
        <button
          onClick={handleSortToggle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sort {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredCharacters.map((character: any) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      {data.allPeople.pageInfo.hasNextPage && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(CharacterList);
