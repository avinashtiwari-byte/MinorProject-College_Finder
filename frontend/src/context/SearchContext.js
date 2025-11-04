import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    type: [], // 'government', 'private', 'deemed', 'autonomous'
    state: '',
    district: '',
    courses: [],
    minRanking: null,
    maxRanking: null,
    minFees: null,
    maxFees: null,
    rating: null,
  });

  // Sort state
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance', 'ranking', 'fees', 'rating', 'name'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(12);

  // Search history
  const [searchHistory, setSearchHistory] = useState([]);

  // Autocomplete suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('collegefinder-search-history');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error parsing search history:', error);
      }
    }
  }, []);

  // Save search history to localStorage
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('collegefinder-search-history', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  // Add search to history
  const addToSearchHistory = (query) => {
    if (!query.trim()) return;

    setSearchHistory(prev => {
      const filtered = prev.filter(item => item !== query);
      return [query, ...filtered].slice(0, 10); // Keep only last 10 searches
    });
  };

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('collegefinder-search-history');
  };

  // Update filter
  const updateFilter = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Update multiple filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      type: [],
      state: '',
      district: '',
      courses: [],
      minRanking: null,
      maxRanking: null,
      minFees: null,
      maxFees: null,
      rating: null,
    });
    setCurrentPage(1);
  };

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.type.length > 0) count++;
    if (filters.state) count++;
    if (filters.district) count++;
    if (filters.courses.length > 0) count++;
    if (filters.minRanking !== null || filters.maxRanking !== null) count++;
    if (filters.minFees !== null || filters.maxFees !== null) count++;
    if (filters.rating !== null) count++;
    return count;
  };

  // Handle search
  const performSearch = async (query = searchQuery) => {
    if (!query.trim() && getActiveFiltersCount() === 0) {
      setSearchResults([]);
      setTotalResults(0);
      setTotalPages(1);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      // This would be replaced with actual API call
      // For now, we'll simulate a search
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock search results
      const mockResults = Array.from({ length: 20 }, (_, index) => ({
        _id: `college-${index + 1}`,
        name: `${query || 'College'} ${index + 1}`,
        type: ['government', 'private', 'deemed'][Math.floor(Math.random() * 3)],
        state: filters.state || 'Karnataka',
        district: filters.district || 'Bangalore',
        ranking: Math.floor(Math.random() * 100) + 1,
        fees: Math.floor(Math.random() * 500000) + 100000,
        rating: (Math.random() * 3 + 2).toFixed(1),
        courses: ['Engineering', 'Medical', 'Management'],
      }));

      // Apply filters (mock filtering)
      let filteredResults = mockResults;

      if (filters.type.length > 0) {
        filteredResults = filteredResults.filter(college =>
          filters.type.includes(college.type)
        );
      }

      if (filters.minFees !== null) {
        filteredResults = filteredResults.filter(college =>
          college.fees >= filters.minFees
        );
      }

      if (filters.maxFees !== null) {
        filteredResults = filteredResults.filter(college =>
          college.fees <= filters.maxFees
        );
      }

      if (filters.rating !== null) {
        filteredResults = filteredResults.filter(college =>
          parseFloat(college.rating) >= filters.rating
        );
      }

      // Apply sorting
      filteredResults.sort((a, b) => {
        let compareValue = 0;

        switch (sortBy) {
          case 'ranking':
            compareValue = a.ranking - b.ranking;
            break;
          case 'fees':
            compareValue = a.fees - b.fees;
            break;
          case 'rating':
            compareValue = parseFloat(b.rating) - parseFloat(a.rating);
            break;
          case 'name':
            compareValue = a.name.localeCompare(b.name);
            break;
          default:
            compareValue = 0;
        }

        return sortOrder === 'asc' ? compareValue : -compareValue;
      });

      const total = filteredResults.length;
      const pages = Math.ceil(total / resultsPerPage);
      const startIndex = (currentPage - 1) * resultsPerPage;
      const paginatedResults = filteredResults.slice(startIndex, startIndex + resultsPerPage);

      setSearchResults(paginatedResults);
      setTotalResults(total);
      setTotalPages(pages);

      if (query.trim()) {
        addToSearchHistory(query.trim());
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Failed to search colleges. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Get autocomplete suggestions
  const getSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      // Mock suggestions - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 300));

      const mockSuggestions = [
        'IIT Bombay',
        'IIT Delhi',
        'IIT Madras',
        'Bangalore Engineering College',
        'Delhi University',
        'AIIMS Delhi',
        'Anna University Chennai',
        'JNU Delhi',
      ].filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);

      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Suggestions error:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Select suggestion
  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
    performSearch(suggestion);
  };

  // Reset search
  const resetSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    setSearchError(null);
    setCurrentPage(1);
    setTotalPages(1);
    setTotalResults(0);
    clearFilters();
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const value = {
    // Search state
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    searchError,
    performSearch,
    resetSearch,

    // Filters
    filters,
    updateFilter,
    updateFilters,
    clearFilters,
    getActiveFiltersCount,

    // Sorting
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    totalResults,
    resultsPerPage,
    setResultsPerPage,

    // Search history
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,

    // Autocomplete
    suggestions,
    showSuggestions,
    setShowSuggestions,
    getSuggestions,
    selectSuggestion,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;