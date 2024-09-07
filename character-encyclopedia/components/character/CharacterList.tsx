import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '@queries/characters';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import CharacterCard from './CharacterCard';
import SearchBar from '../ui/SearchBar';
import Button from '../ui/Button';
import styles from '@styles/components/character/CharacterList.module.scss';

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
    <div className={styles.container}>
      <h1 className={styles.title}>All Characters</h1>
      <div className={styles.controlsContainer}>
        <SearchBar onSearch={handleSearch} />
        <Button onClick={handleSortToggle}>
          Sort {sortOrder === 'asc' ? '↑' : '↓'}
        </Button>
      </div>
      <div className={styles.characterGrid}>
        {filteredCharacters.map((character: any) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      {data.allPeople.pageInfo.hasNextPage && (
        <div className={styles.loadMoreContainer}>
          <Button onClick={handleLoadMore} isLoading={loading}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(CharacterList);