import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import styles from '@styles/components/ui/SearchBar.module.scss';
import { SearchBarProps } from '@/interfaces/search';

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialSearch = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const debouncedSearch = debounce(onSearch, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search characters..."
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;
