import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { useDebounce } from '../../hooks/useDebounce';

const SearchBar = ({ placeholder = "Search for colleges, courses, or locations..." }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localQuery, setLocalQuery] = useState('');
  const searchRef = useRef(null);

  const {
    searchQuery,
    setSearchQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    getSuggestions,
    selectSuggestion,
    searchHistory,
    performSearch,
  } = useSearch();

  // Debounce the search query for API calls
  const debouncedQuery = useDebounce(localQuery, 300);

  // Update global search query when local query changes
  useEffect(() => {
    setSearchQuery(localQuery);
  }, [localQuery, setSearchQuery]);

  // Get suggestions when query changes
  useEffect(() => {
    if (debouncedQuery && isFocused) {
      getSuggestions(debouncedQuery);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedQuery, isFocused, getSuggestions]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowSuggestions]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    setIsFocused(true);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (localQuery) {
      getSuggestions(localQuery);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      performSearch(localQuery.trim());
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setLocalQuery('');
    setSearchQuery('');
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    selectSuggestion(suggestion);
    setIsFocused(false);
  };

  const handleHistoryClick = (historyItem) => {
    setLocalQuery(historyItem);
    performSearch(historyItem);
    setShowSuggestions(false);
    setIsFocused(false);
  };

  // Popular searches
  const popularSearches = [
    'IIT Bombay',
    'Engineering Colleges',
    'MBA in Delhi',
    'Medical Colleges',
    'Bangalore University',
  ];

  return (
    <div ref={searchRef} className="relative w-full max-w-4xl">
      {/* Search Input */}
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        className="relative"
      >
        <form onSubmit={handleSubmit}>
          <div className={`glass rounded-2xl p-3 backdrop-blur-xl border transition-all duration-300 ${
            isFocused
              ? 'border-purple-400/50 shadow-glow-lg'
              : 'border-white/20 hover:border-white/30'
          }`}>
            <div className="flex items-center">
              <Search className={`w-6 h-6 ml-4 mr-3 transition-colors duration-300 ${
                isFocused ? 'text-purple-400' : 'text-gray-400'
              }`} />

              <input
                type="text"
                value={localQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none py-3 text-lg"
              />

              {localQuery && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={clearSearch}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors mr-2"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </motion.button>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl mr-2 hover:shadow-lg transition-all duration-300"
              >
                Search
              </motion.button>
            </div>
          </div>
        </form>

        {/* Search Indicator */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (suggestions.length > 0 || searchHistory.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl border border-white/20 backdrop-blur-xl max-h-96 overflow-hidden z-50"
          >
            <div className="max-h-96 overflow-y-auto">
              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-gray-300">Suggestions</span>
                  </div>
                  <div className="space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={suggestion}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 flex items-center space-x-3 group"
                      >
                        <Search className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                        <span className="text-gray-300 group-hover:text-white">
                          {suggestion}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search History */}
              {searchHistory.length > 0 && (
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-gray-300">Recent Searches</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {searchHistory.slice(0, 5).map((item, index) => (
                      <motion.button
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleHistoryClick(item)}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 flex items-center space-x-3 group"
                      >
                        <Clock className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                        <span className="text-gray-300 group-hover:text-white">
                          {item}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              {!localQuery && suggestions.length === 0 && (
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-gray-300">Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <motion.button
                        key={search}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleHistoryClick(search)}
                        className="px-3 py-2 text-sm rounded-lg glass hover:bg-white/20 transition-colors duration-200 text-gray-300 hover:text-white"
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;