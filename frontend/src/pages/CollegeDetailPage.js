import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const CollegeDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen container-custom py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">College Details</h1>
        <p className="text-xl text-gray-300">
          Detailed information for college ID: {id}
        </p>
        <p className="text-lg text-gray-400 mt-4">
          Comprehensive college profiles with tabbed content coming soon!
        </p>
      </motion.div>
    </div>
  );
};

export default CollegeDetailPage;