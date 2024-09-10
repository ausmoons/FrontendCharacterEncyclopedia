import React, { useCallback, useMemo } from 'react';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import ErrorMessage from '@components/ui/ErrorMessage';
import CharacterCard from '@components/character/CharacterCard';
import SearchBar from '@components/ui/SearchBar';
import Button from '@components/ui/Button';
import useCharacterList from '@hooks/useCharacterList';
import styles from '@styles/components/character/CharacterList.module.scss';
import { Character } from '@/interfaces/character';
import { handleError, logError } from '@utils/errorHandling';

const CharacterList: React.FC = () => {
  const {
    filteredCharacters,
    loading,
    error,
    searchTerm,
    sortOrder,
    handleSearch,
    handleSortToggle,
    handleLoadMore,
    hasNextPage,
  } = useCharacterList();

  const handleSearchCallback = useCallback(
    (term: string) => {
      handleSearch(term);
    },
    [handleSearch]
  );

  const characterCards = useMemo(() => {
    return filteredCharacters.map((character: Character) => (
      <CharacterCard key={character.id} character={character} />
    ));
  }, [filteredCharacters]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    const errorDetails = handleError(error);
    logError(errorDetails);
    return (
      <ErrorMessage type={errorDetails.type} message={errorDetails.message} />
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Characters</h1>
      <div className={styles.controlsContainer}>
        <SearchBar onSearch={handleSearchCallback} initialSearch={searchTerm} />
        <Button onClick={handleSortToggle}>
          Sort {sortOrder === 'asc' ? '↑' : '↓'}
        </Button>
      </div>
      <div className={styles.characterGrid}>{characterCards}</div>
      {hasNextPage && (
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
