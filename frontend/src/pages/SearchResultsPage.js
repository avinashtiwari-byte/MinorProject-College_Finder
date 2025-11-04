import React from 'react';
import { motion } from 'framer-motion';

const SearchResultsPage = () => {
  return (
    <div className="min-h-screen container-custom py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">Search Results</h1>
        <p className="text-xl text-gray-300">
          Advanced search and filtering functionality coming soon!
        </p>
      </motion.div>
    </div>
  );
};

export default SearchResultsPage;