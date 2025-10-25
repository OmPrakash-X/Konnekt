import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  className = '',
  autoFocus = false,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="
            w-full pl-12 pr-12 py-3 rounded-full
            bg-gray-100 dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            text-gray-900 dark:text-gray-100
            placeholder:text-gray-500 dark:placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#32b8c6] focus:border-transparent
            transition-all duration-200
          "
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
              transition-colors
            "
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
