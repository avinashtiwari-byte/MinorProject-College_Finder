import React from 'react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { Heart, BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen container-custom py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-4xl font-bold gradient-text">My Wishlist</h1>
          </div>
          <p className="text-xl text-gray-300">
            Your saved colleges for comparison and future reference
          </p>
        </div>

        {/* Wishlist Content */}
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-400 mb-6">
              Start adding colleges to compare and choose the best one for you!
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <BookOpen className="w-5 h-5" />
              <span>Browse Colleges</span>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Stats */}
            <div className="glass rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Colleges</p>
                  <p className="text-3xl font-bold gradient-text">{wishlist.length}</p>
                </div>
                {wishlist.length > 0 && (
                  <button
                    onClick={clearWishlist}
                    className="px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((college, index) => (
                <motion.div
                  key={college._id || college.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {college.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {college.location || college.state}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(college._id || college.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    </button>
                  </div>

                  {college.rating && (
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-white">{college.rating}</span>
                    </div>
                  )}

                  <Link
                    to={`/college/${college._id || college.id}`}
                    className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Comparison Section */}
            {wishlist.length >= 2 && (
              <div className="mt-12 text-center">
                <div className="glass rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Compare Your Shortlisted Colleges
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Get a side-by-side comparison of your saved colleges to make the best choice.
                  </p>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                    Compare Colleges ({wishlist.length} selected)
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default WishlistPage;