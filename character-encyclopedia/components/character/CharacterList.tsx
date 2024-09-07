import React from 'react';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import ErrorMessage from '@components/ui/ErrorMessage';
import CharacterCard from '@components/character/CharacterCard';
import SearchBar from '@components/ui/SearchBar';
import Button from '@components/ui/Button';
import { useCharacterList } from '@hooks/useCharacterList';
import styles from '@styles/components/character/CharacterList.module.scss';
import { Character } from '@/types/character';

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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Characters</h1>
      <div className={styles.controlsContainer}>
        <SearchBar onSearch={handleSearch} initialSearch={searchTerm} />
        <Button onClick={handleSortToggle}>
          Sort {sortOrder === 'asc' ? '↑' : '↓'}
        </Button>
      </div>
      <div className={styles.characterGrid}>
        {filteredCharacters.map((character: Character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
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
