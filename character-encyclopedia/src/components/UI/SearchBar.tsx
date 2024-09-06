import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    initialSearch?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialSearch = '' }) => {
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
        <div className="mb-6">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search characters..."
                className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
        </div>
    );
};

export default SearchBar;